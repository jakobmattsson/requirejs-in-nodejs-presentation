var db = require('../stores/mongo');
var s3 = require('../stores/s3');
var async = require('async');
var _ = require('underscore');

exports.list = function(callback) {
  db.selectAll('photos', callback);
};

exports.get = function(id, callback) {
  db.selectById('photos', id, callback);
};

exports.create = function(data, callback) {

  var storeBinary = function(callback) {
    s3.put(data.filename, data.file, callback);
  };

  var storeData = function(callback) {
    var dataExceptFile = _.extend(data, {
      file: undefined
      url: s3.root + '/' + data.filename
    });
    db.insert('photos', dataExceptFile, callback);
  };

  async.parallel([storeBinary, storeData], function(err, results) {
    if (err) {
      return callback(err);
    }
    callback(null, results[1]);
  });
};

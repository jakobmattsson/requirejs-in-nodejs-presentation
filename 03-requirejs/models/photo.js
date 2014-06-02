var requirejs = require('requirejs');
var async = require('async');
var _ = require('underscore');

requirejs.define('photoModel', function(require, exports, module) {

  var db = require('mongoStore');
  var s3 = require('s3Store');

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
});

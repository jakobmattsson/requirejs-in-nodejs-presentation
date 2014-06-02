var async = require('async');
var _ = require('underscore');
var tree = require('../tree');

tree.register('photoModel', function(mongoStore, s3Store) {

  return {
    list: function(callback) {
      mongoStore.selectAll('photos', callback);
    },

    get: function(id, callback) {
      mongoStore.selectById('photos', id, callback);
    },

    create: function(data, callback) {

      var storeBinary = function(callback) {
        s3Store.put(data.filename, data.file, callback);
      };

      var storeData = function(callback) {
        var dataExceptFile = _.extend(data, {
          file: undefined
          url: s3Store.root + '/' + data.filename
        });
        mongoStore.insert('photos', dataExceptFile, callback);
      };

      async.parallel([storeBinary, storeData], function(err, results) {
        if (err) {
          return callback(err);
        }
        callback(null, results[1]);
      });
    }
  };
});


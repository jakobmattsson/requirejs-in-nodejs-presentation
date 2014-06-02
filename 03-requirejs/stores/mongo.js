var MongoClient = require('mongodb').MongoClient;
var requirejs = require('requirejs');

requirejs.define('mongoStore', function(require, exports, module) {

  var configuration = require('configuration');

  var getClient = (function() {

    var callbacks = [];
    var client = null;
    var inited = false;
    var connstr = 'mongodb://' + configuration.mongo.host + '/' + configuration.mongo.db;

    return function(callback) {
      if (client) {
        callback(null, client);
        return;
      }
      if (inited) {
        callbacks.push(callback);
        return;
      }

      inited = true;
      MongoClient.connect(connstr, function(err, db) {
        if (!err) {
          client = db;
        }

        callbacks.forEach(function(cb) {
          cb(err, db);
        });
        callbacks = [];

        if (err) {
          inited = false;
        }
      });
    };
  }());



  exports.selectAll = function(table, callback) {
    getClient(function(err, db) {
      var collection = db.collection(table);
      collection.find().toArray(callback);
    });
  };

  exports.selectById = function(table, id, callback) {
    getClient(function(err, db) {
      var collection = db.collection(table);
      collection.find({ _id: new ObjectID(id) }).toArray(function(err, items) {
        if (err) {
          callback(err);
        } else {
          callback(null, items[0]);
        }
      });
    });
  };

  exports.insert = function(table, data, callback) {
    getClient(function(err, db) {
      var collection = db.collection(table);
      collection.insert(data, callback);
    });
  };

});

var MongoClient = require('mongodb').MongoClient;
var tree = require('../tree');

tree.register('mongoClient', function(configuration, _done) {
  var connstr = 'mongodb://' + configuration.mongo.host + '/' + configuration.mongo.db;
  MongoClient.connect(connstr, _done);
};

tree.register('mongoStore', function(mongoClient) {
  return {
    selectAll: function(table, callback) {
      var collection = mongoClient.collection(table);
      collection.find().toArray(callback);
    },
    selectById: function(table, id, callback) {
      var collection = mongoClient.collection(table);
      collection.find({ _id: new ObjectID(id) }).toArray(function(err, items) {
        if (err) {
          callback(err);
        } else {
          callback(null, items[0]);
        }
      });
    },
    insert: function(table, data, callback) {
      var collection = mongoClient.collection(table);
      collection.insert(data, callback);
    }
  };
});

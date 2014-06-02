var db = require('../stores/mongo');

exports.list = function(callback) {
  db.selectAll('users', callback);
};

exports.get = function(id, callback) {
  db.selectById('users', id, callback);
};

exports.create = function(data, callback) {
  db.insert('users', data, callback);
};

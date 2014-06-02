var requirejs = require('requirejs');

requirejs.define('userModel', function(require, exports, module) {

  var db = require('mongoStore');

  exports.list = function(callback) {
    db.selectAll('users', callback);
  };

  exports.get = function(id, callback) {
    db.selectById('users', id, callback);
  };

  exports.create = function(data, callback) {
    db.insert('users', data, callback);
  };

});

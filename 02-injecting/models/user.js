exports.init = function(db) {
  return {
    list: function(callback) {
      db.selectAll('users', callback);
    },
    get: function(id, callback) {
      db.selectById('users', id, callback);
    },
    create: function(data, callback) {
      db.insert('users', data, callback);
    }
  };
};


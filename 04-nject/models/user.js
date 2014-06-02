var tree = require('../tree');

tree.register('photoModel', function(dbStore, s3Store) {

  return {
    list: function(callback) {
      mongoStore.selectAll('users', callback);
    },
    get: function(id, callback) {
      mongoStore.selectById('users', id, callback);
    },
    create: function(data, callback) {
      mongoStore.insert('users', data, callback);
    }
  };
});


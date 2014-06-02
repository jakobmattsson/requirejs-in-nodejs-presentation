var fs = require('fs');
var tree = require('../tree');

tree.register('configuration', function(_done) {
  fs.readFile('./config.json', function(err, data) {
    if (err) {
      _done(err);
    } else {
      _done(null, JSON.parse(data));
    }
  });
});

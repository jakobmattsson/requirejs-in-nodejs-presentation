var fs = require('fs');

exports.getConfig = function(callback) {
  fs.readFile('./config.json', function(err, result) {
    callback(null, JSON.parse(result));
  });
};

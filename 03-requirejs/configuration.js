var fs = require('fs');
var define = require('requirejs').define;

define('configuration', [], function() {
  return JSON.parse(fs.readFileSync('./config.json'));
});

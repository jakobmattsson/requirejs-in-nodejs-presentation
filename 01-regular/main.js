var requireAll = require('require-all');
var express = require('express');
var bodyParser = require('body-parser');
var controllers = requireAll('./controllers');

var app = express();

app.disable('x-powered-by');

app.use(bodyParser());

controllers.forEach(function(controller) {
  controller.addRoutes(app);
});

app.listen(3000, function() {
  console.log('Server running...');
});

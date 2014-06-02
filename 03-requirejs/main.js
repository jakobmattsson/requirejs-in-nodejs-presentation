var express = require('express');
var requirejs = require('requirejs');
var requireAll = require('require-all');
var bodyParser = require('body-parser');

requirejs.config({
  nodeRequire: require
});

requireAll('./controllers')
requireAll('./models')
requireAll('./stores')
require('./configuration')


requirejs(['photoController', 'userController'], function(photoController, userController) {
  var app = express();

  app.disable('x-powered-by');

  app.use(bodyParser());

  photoController.addRoutes(app);
  userController.addRoutes(app);

  app.listen(3000, function() {
    console.log('Server running...');
  });
});

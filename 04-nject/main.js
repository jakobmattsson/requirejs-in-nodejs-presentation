var requireAll = require('require-all');
var express = require('express');
var bodyParser = require('body-parser');
var tree = require('./tree');

requireAll('./controllers')
requireAll('./models')
requireAll('./stores')
require('./configuration')



var app = express();

app.disable('x-powered-by');

app.use(bodyParser());

tree.register('dbStore', function(mongoStore) {
  return mongoStore;
});

tree.resolve(function(photoController, userController) {
  photoController.addRoutes(app);
  userController.addRoutes(app);

  app.listen(3000, function() {
    console.log('Server running...');
  });
});

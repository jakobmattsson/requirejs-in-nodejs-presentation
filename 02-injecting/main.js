var requireAll = require('require-all');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.disable('x-powered-by');

app.use(bodyParser());

require('./configuration').getConfig(function(err, config) {

  var s3 = require('./store/s3').init(config);
  var mongo = require('./store/mongo').init(config);
  var photoModel = require('./models/photo').init(mongo, s3);
  var userModel = require('./models/user').init(mongo);
  var photoCtrl = require('./controllers/photo').init(photoModel);
  var userCtrl = require('./controllers/user').init(userModel);

  photoCtrl.addRoutes(app);
  userCtrl.addRoutes(app);

  app.listen(3000, function() {
    console.log('Server running...');
  });
});

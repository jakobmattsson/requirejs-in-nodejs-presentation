var requirejs = require('requirejs');

requirejs.define('photoController', ['photoModel'], function(photoModel) {

  return {
    addRoutes: function(app) {

      app.get('/photos', function(req, res) {
        res.send(photoModel.list());
      });

      app.get('/photos/:id', function(req, res) {
        res.send(photoModel.get(req.params.id));
      });

      app.post('/photos', function(req, res) {
        res.send(photoModel.create(req.body));
      });

    };
  };
});

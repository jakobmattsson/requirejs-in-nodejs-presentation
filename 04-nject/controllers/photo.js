var context = require('../tree');

context.register('photoController', function(photoModel, _done) {
  _done(null, {
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
  });
});

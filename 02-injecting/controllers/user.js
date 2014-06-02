exports.init = function(userModel) {

  return {
    addRoutes: function(app) {

      app.get('/users', function(req, res) {
        res.send(userModel.list());
      });

      app.get('/users/:id', function(req, res) {
        res.send(userModel.get(req.params.id));
      });

      app.post('/users', function(req, res) {
        res.send(userModel.create(req.body));
      });
    };
  };
};


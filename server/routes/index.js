const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));

  //USER
  app.post('/api/user', usersController.create);
  app.get('/api/user', usersController.read);
  app.put('/api/user/:user_id', usersController.update);
  app.delete('/api/user/:user_id', usersController.destroy);
  app.get('/api/users', usersController.list);

  //AUTH
  app.post('/api/user/login', usersController.login);

};

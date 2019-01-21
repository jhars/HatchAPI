const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Users API!',
  }));

  app.post('/api/user', usersController.create);
  app.get('/api/user', usersController.read);
  app.post('/api/user', usersController.update);
  app.delete('/api/user', usersController.destroy);

  app.get('/api/users', usersController.list);
};

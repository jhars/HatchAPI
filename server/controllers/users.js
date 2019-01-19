const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Users
      .all()
      .then(users => res.status(200). send(users))
      .catch(error => res.status(400).send(error));
  }
};

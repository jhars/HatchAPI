const User = require('../models').User;
const sms = require('../services/send_sms');
const client = require('twilio')(sms.sid, sms.token);

module.exports = {

  create(req, res) {
    return User
      .create({
        first_name: req.body.first_name,
        phone_number: req.body.phone_number,
      })
      .then(user => {
        console.log('client goes here');
        const pin = Math.random();
        const pinString = pin.toString();
        const lastFour = pinString.substr(-4);
        console.log("CL: ==>> : "+ lastFour);

        client.messages
        .create({
           body: 'FOREST, FOREST  ..!?',
           from: '+18654194204',
           to: '+12484449837'
         })
        .then(message => console.log(message.sid))
        .done()
        res.status(201).send(user)
      })
      .catch(error => res.status(400).send(error));
  },

  read(req, res) {
    return User
      .findById(req.body.user_id)
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },

  update (req, res) {
    return User
      .find({
        where: {
          id: req.params.user_id
        }
      })
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }

        return user
          .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedUser => res.status(200).send(updatedUser))
          .catch(error => res.status(402).send(error));
      })
  },

  destroy (req, res) {
    return User
      .find({
        where: {
          id: req.params.user_id
        }
      })
      .then(user => {
        if(!user) {
          return res.status(404).send({
            message: 'User not found.'
          })
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(401).send(error));
  },

  list(req, res) {
    return User
      .all()
      .then(users => res.status(200). send(users))
      .catch(error => res.status(400).send(error));
  }
};

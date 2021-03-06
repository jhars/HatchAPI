const User = require('../models').User;
const sms = require('../services/send_sms');  
const client = require('twilio')(sms.sid, sms.token)
const token = require('../services/auth_crypt');  
const bcrypt = require('bcrypt');

module.exports = {

  async confirmPhone(req, res) {
    try {
      const phone = req.body.phone
      console.log(`code: ${req.body.code}`)
      const code = req.body.code
      const user = await User.findOne({ where: { phone_number: phone } })
      console.log(`user: ${user}`)

      if (user.temp_code == req.body.code) {
        console.log("Confirmation!")
        res.status(200).send("success")
      } else {
        res.status(401).send("UNAUTHORIZED - code does not match")
      }



    } catch (error) {
      console.log("Phone Number Confirmation Error")
      res.status(399).send(error)
    }
  },

  async sendTwoFactorCode(req, res) {
    const code = "123456"
    try {
      client.messages.create({
        body: code,
        from: '+12056977892',
        to: req.body.phone
      })
      console.log("= = = MESSAGE SENT = = = = ")
      const user = await User.findOne({ where: { phone_number: req.body.phone } })
      console.log("= = = USER FOUND = = = = ")
      
      await user.update({ temp_code: code })
      console.log("= = = = = = = ")
      res.status(200).send("succes")
    } catch(error) {
      res.status(400).send(error)
    }
  },

  async login(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } })
      const userEnteredPassword = req.body.password;
      await bcrypt.compare(userEnteredPassword, user.password, function(err, result) {
        if (result == true) {
          res.status(200).send("authorized")
        } else {
          console.log("invalid password")
          res.status(401).send(err)
        }
      });


    } catch (error) {
      console.log("in catch block")
      res.status(400).send("AUTHORIZATION ERROR")
    }
  },

  async create(req, res) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const user = await User.create({
        email: req.body.email,
        first_name: req.body.first_name,
        password: hashedPassword,
        phone_number: req.body.phone_number,
        random_field: req.body.random_field,
      })
    await res.status(201).send(user)
    return user

  } catch (error) {
      console.log(error);
      res.status(400).send(error)
  }
  // Return null if error
  return null;
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

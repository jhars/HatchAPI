const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express(); // Set up the express app

app.use(logger('dev')); // Log requests to the console.
app.use(bodyParser.json()); // Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
require('./server/routes')(app); //Require our routes into the application

app.get('*', (req, res) => res.status(200).send({ // Setup a default catch-all route that sends back a welcome message in JSON format.
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;

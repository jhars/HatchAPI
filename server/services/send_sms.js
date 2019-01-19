// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC95a7fd667614b732f4323bc082022243';
const authToken = '2c5fed5d13dbf8195bc8a47913c3a234';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18654194204',
     to: '+12484449837'
   })
  .then(message => console.log(message.sid))
  .done();

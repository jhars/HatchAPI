const bcrypt = require('bcrypt');

bcrypt.hash('myPassword', 10, function(err, hash) {
  //Store hash in database
  console.log(hash);
  console.log(err);


});


// bcrypt.compare('somePassword', hash, function(err, res) {
//   if (res) {
//     //passwords match
//   } else {
//     //passwords don't match
//   }
// });

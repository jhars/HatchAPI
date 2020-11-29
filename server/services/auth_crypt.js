const bcrypt = require('bcrypt');

function hash(password) {
  bcrypt.hash(password, 10, function(err, hash) {

    if (!err) {
      //Store hash in database
      console.log("======= HASH ========");
      console.log(hash);
      return hash
    } else {
        console.log(err);
    }

  });

  // return hash
}

function salt(hash) {
  const key = "key 01"
  return hash
}

module.exports = {

  tokenize(password) {
    return salt(hash(password))
  }

};






// bcrypt.compare('somePassword', hash, function(err, res) {
//   if (res) {
//     //passwords match
//   } else {
//     //passwords don't match
//   }
// });

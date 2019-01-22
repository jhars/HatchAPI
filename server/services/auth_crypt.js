const bcrypt = requre('bcrypt');

bcrypt.hash('myPassword', 10, function(err, hash) {
  //Store hash in database
});


bcrypt.compare('somePassword', hash, function(err, res) {
  if (res) {
    //passwords match
  } else {
    //passwords don't match
  }
});

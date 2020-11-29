'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    random_field: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

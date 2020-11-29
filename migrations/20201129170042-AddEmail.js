'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        'Users',
        'email',
        Sequelize.STRING
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        'Users',
        'random_field_two');
  }
};

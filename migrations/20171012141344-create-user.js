'use strict';

// If using sequelize sync, migrations do not come into play. Just leaving this here if you decide
// to keep using migrations

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.STRING
      },
      streetAddress: {
        type: Sequelize.STRING
      },
      cityAddress: {
        type: Sequelize.STRING
      },
      stateCode: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      lastLoginDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};

'use strict';

const paymentTypes = require('../data/payment-types');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PaymentTypes', paymentTypes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PayentTypes', null, {});
  }
};

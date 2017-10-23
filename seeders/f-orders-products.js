'use strict';

const ordersProducts = require('../data/orders-products');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('OrdersProducts', ordersProducts, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('OrdersProducts', null, {});
  }
};
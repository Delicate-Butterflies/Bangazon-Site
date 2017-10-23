'use strict';

const productTypes = require('../data/product-types');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductTypes', productTypes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductTypes', null, {});
  }
};

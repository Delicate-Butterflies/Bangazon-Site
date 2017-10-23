'use strict';

const productTypes = require('../data/producttype');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductTypes', productTypes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductTypes', null, {});
  }
};

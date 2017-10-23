'use strict';

const { assert } = require('chai');
const db = require('../models/index.js');
const app = require('../app');

describe('Product Types', () => {
  before(() => {
    const models = app.get('models');
    const { ProductTypes } = require('../seeders/b-product-types');
    models.sequelize.sync()
      .then(() => {
        models.ProductType.bulkCreate(ProductTypes);
      });
  });
  describe('ProductType.findAll()', () => {
    it('should return an array', () => {
      return db.ProductType.findAll()
        .then((productTypesArr) => {
          assert.isArray(productTypesArr);
        });
    });
  });
});
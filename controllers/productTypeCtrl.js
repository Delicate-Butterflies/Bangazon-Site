'use strict';

const sequelize = require('sequelize');

/** @module Product Type Controller */

module.exports.getAllProductTypes = (req, res, next) => {
  const { ProductType, Product } = req.app.get('models');
  ProductType.findAll({
    include: [
      {
        model: Product,
        limit: 3
      }
    ]
  })
    .then(results => {
      let productTypes = results;
      res.render('product-types', { productTypes });
    })
    .catch(err => {
      next(err);
    });
};

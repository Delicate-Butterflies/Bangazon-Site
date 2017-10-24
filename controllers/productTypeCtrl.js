'use strict';

const sequelize = require('sequelize');

/** @module Product Type Controller */

/**
 * Get all product types and associated products and render 'product-types'
 */

module.exports.getAllProductTypes = (req, res, next) => {
  const { ProductType, Product } = req.app.get('models');
  ProductType.findAll({
    include: { model: Product }
  })
    .then(productTypes => {
      res.render('product-types', { productTypes });
    })
    .catch(err => {
      next(err);
    });
};

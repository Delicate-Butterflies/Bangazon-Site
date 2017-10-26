'use strict';

// const sequelize = require('sequelize');

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

/**
 * Get a product type by ID and render 'product-types/:id' with info
 */
module.exports.getProductTypeById = (req, res, next) => {
  const { ProductType, Product, Order } = req.app.get('models');
  ProductType.findById(req.params.id, {
    include: [
      {
        model: Product,
        include: [{ model: Order }] // include order inside products to connect.
      }
    ]
  })
    .then(productType => {
      res.render('products-of-a-type', { productType });
    })
    .catch(err => {
      next(err);
    });
};

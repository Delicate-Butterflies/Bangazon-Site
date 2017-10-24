'use strict';

const sequelize = require('sequelize');

/** @module Product Type Controller */

module.exports.getAllProductTypes = (req, res, next) => {
  const { ProductType, Product } = req.app.get('models');
  ProductType.findAll({
    include: [
      {
        model: Product,
        attributes: []
      }
    ],
    attributes: {
      include: [[sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount']]
    },
    group: ['ProductType.id']
  })
    .then(productTypes => {
      res.json(productTypes);
      // res.render('product-types', { productTypes });
    })
    .catch(err => {
      next(err);
    });
};

'use strict';

const sequelize = require('sequelize');

/** @module Product Type Controller */

module.exports.getAllProductTypes = (req, res, next) => {
  const { ProductType, Product } = req.app.get('models');
  ProductType.findAll({
    include: [
      {
        model: Product,
        duplicating: false,
        attributes: [[sequelize.fn('COUNT', sequelize.col('Product.id')), 'totalProducts'], 'Product'],
        group: ['Product.productTypeId']
      }
    ]
  })
    .then(results => {
      res.json(results);
      // let productTypes = results;
      // res.render('product-types', { productTypes });
    })
    .catch(err => {
      next(err);
    });
};

// module.exports.getAllProductTypes = (req, res, next) => {
//   const { Product } = req.app.get('models');
//   Product.count({
//     col: 'Product.id',
//     distinct: true,
//     group: 'Product.productTypeId'
//   })
//     .then(results => {
//       res.json(results);
//     })
//     .catch(err => {
//       next(err);
//     });
// };

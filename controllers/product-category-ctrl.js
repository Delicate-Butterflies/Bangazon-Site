'use strict';

module.exports.listProductCategory = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(productCategories => {
      res.json(productCategories);
    })
    .catch(err => next(err));
};
'use strict';

// display form for creating new product
module.exports.displayProductAdd = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll().then(data => {
    console.log('my god damn product data', data);
    res.render('add-product', data);
  });
};

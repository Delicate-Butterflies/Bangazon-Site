'use strict';

/** @module Product Controller */

/**
 * Get single product and render 'product-details'
 */

// display form for creating new product
module.exports.displayProductAdd = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll().then(data => {
    data.productTypes = data.map(trainee => {
      return Object.assign({}, trainee.dataValues);
    });
    console.log('my god damn product data', data);
    res.render('add-product', data);
  });
};

module.exports.createNewProduct = (req, res, next) => {
  req.body.sellerUserId = req.session.passport.user.id;
  const { Product } = req.app.get('models');
  Product.create(req.body, {
    'req.body.title': {
      validate: { isAlpha: true }
    }
  })
    .then(response => {
      res.redirect('/welcome');
    })
    .catch(err => {
      next(err);
    });
};

module.exports.getProductById = (req, res, next) => {
  const { Product, Order } = req.app.get('models');
  Product.findById(req.params.id, {
    include: [
      {
        all: true
        // model: Order,
        // where: {
        // 	PaymentTypeId: {
        // 		$ne: null
        // 	}
        // }
      }
    ]
  })
    .then(product => {
      // res.json(product);
      res.render('product-details', { product });
    })
    .catch(err => {
      next(err);
    });
};

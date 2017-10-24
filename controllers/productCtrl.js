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
    res.render('add-product', data);
  });
};

module.exports.createNewProduct = (req, res, next) => {
  req.body.sellerUserId = req.session.passport.user.id;
  const { Product } = req.app.get('models');

  // req.checkBody('title', 'Last Name must be alphanumeric.').isAlpha();

  // const errors = req.validationErrors();

  // const product = new Product(req.body);
  // console.log(errors);

  // if (errors) {
  //   //If there are errors render the form again, passing the previously entered values and errors
  //   const { ProductType } = req.app.get('models');
  //   ProductType.findAll().then(data => {
  //     data.productTypes = data.map(trainee => {
  //       return Object.assign({}, trainee.dataValues);
  //     });
  //     res.render('add-product', data, { title: 'Create Product', product: product, errors: errors });
  //   });
  //   return;
  // } else {
  Product.create(req.body, {
    'req.body.title': {
      validate: { isAlpha: true }
    }
  })
    .then(response => {
      // console.log('RESPONSE FROM THE POST', response);
      res.redirect(`/products/${response.dataValues.id}`);
    })
    .catch(err => {
      next(err);
    });
  // }
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

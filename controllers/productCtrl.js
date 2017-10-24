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

  // Validate req.body information

  // doesn't allow for spaces commented out for now
  // req.checkBody('title', 'Title must be alphanumeric.').isAlpha();
  req.checkBody('price', 'Price must be a decimal').isNumeric();
  // doesn't allow for spaces commented out for now
  // req.checkBody('description', 'Description must be alphanumeric').isAlpha();
  req.checkBody('ProductTypeId', 'Product Type must be an integer').isInt();
  req.checkBody('quantity', 'Quantity must be an integer').isInt();
  req.checkBody('pictureUrl', 'ImageURL must be a URL').isURL();

  // Sanitize req.body
  // Escape html characters
  req.checkBody('title').escape();
  req.checkBody('price').escape();
  req.checkBody('description').escape();
  req.checkBody('ProductTypeId').escape();
  req.checkBody('quantity').escape();
  req.checkBody('pictureUrl').escape();
  // Trim leading and trailing whitespace
  req.checkBody('title').trim();
  req.checkBody('price').trim();
  req.checkBody('description').trim();
  req.checkBody('ProductTypeId').trim();
  req.checkBody('quantity').trim();
  req.checkBody('pictureUrl').trim();

  const errors = req.validationErrors();
  const product = new Product(req.body);

  if (errors) {
    //If there are errors render the form again, passing the previously entered values and errors
    const { ProductType } = req.app.get('models');
    ProductType.findAll().then(data => {
      data.productTypes = data.map(trainee => {
        return Object.assign({}, trainee.dataValues);
      });
      data.product = product;
      data.errors = errors;
      console.log(data);
      res.render('add-product', data);
    });
    return;
  } else {
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
  }
};

module.exports.getProductById = (req, res, next) => {
  const { Product, Order } = req.app.get('models');
  Product.findById(req.params.id, {})
    .then(product => {
      Product.count({
        where: { id: req.params.id },
        include: [
          {
            model: Order,
            where: {
              PaymentTypeId: {
                $ne: null
              }
            }
          }
        ]
      }).then(sales => {
        res.render('product-details', { product, sales });
      });
    })
    .catch(err => {
      next(err);
    });
};

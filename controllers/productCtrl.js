'use strict';

/** @module Product Controller */

/**
 * display form for creating new product
 */
module.exports.displayProductAdd = (req, res, next) => {
  const { ProductType } = req.app.get('models');
  ProductType.findAll()
    .then(data => {
      data.productTypes = data.map(trainee => {
        return Object.assign({}, trainee.dataValues);
      });
      res.render('add-product', data);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * take product form information and return errors or store data
 */
module.exports.createNewProduct = (req, res, next) => {
  req.body.sellerUserId = req.session.passport.user.id;
  const { Product } = req.app.get('models');

  // Validate req.body information

  // doesn't allow for spaces commented out for now
  // req.checkBody('title', 'Title must be alphanumeric.').isAlpha();
  req.checkBody('price', 'Price must be a decimal').isDecimal();
  // doesn't allow for spaces commented out for now
  // req.checkBody('description', 'Description must be alphanumeric').isAlpha();
  req.checkBody('ProductTypeId', 'Product Type must be an integer').isInt();
  req.checkBody('quantity', 'Quantity must be an integer').isInt();
  req.checkBody('pictureUrl', 'ImageURL must be a URL').isURL();
  req.checkBody('pictureUrl', 'ImageURL is too long - must be less than 255 characters long').isLength({ max: 255 });

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

  // validate for errors and assign the updated data to a new object
  const errors = req.validationErrors();
  const product = new Product(req.body);

  //ff there are errors render the form again, passing the previously entered values and errors
  if (errors) {
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
    // if no errors then post to the db
    // need to create using the sanitized product rather than the req.body
    product
      .save(() => {})
      .then(response => {
        // console.log('RESPONSE FROM THE POST', response);
        res.redirect(`/products/${response.dataValues.id}`);
      })
      .catch(err => {
        next(err);
      });
  }
};

/**
 * get a product by its id and view that product
 */
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

/**
 * Get list of products that contain the search string
 */
module.exports.searchProductsByName = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.findAll({
    where: {
      title: {
        $iLike: `%${req.query.title}%`
      }
    }
  })
    .then(products => res.render('products-search', { products }))
    .catch(err => next(err));
};

/**
 * user can view all of their products
 */
module.exports.showAllUserProducts = (req, res, next) => {
  const { Product, Order } = req.app.get('models');
  Product.findAll({
    // limiting find all to the current users products
    where: {
      sellerUserId: req.session.passport.user.id
    },
    // need the include to get an array of all orders that product is found on
    include: [
      {
        model: Order,
        // only orders that have been completed should be returned
        where: { PaymentTypeId: { $ne: null } },
        // return ALL products regardless if they have orders on which they have been completed
        // without required: false the findAll will ONLY return products that have been on a completed order
        required: false
      }
    ]
  })
    .then(userProducts => {
      console.log('SAIL', userProducts[0]);
      res.render('my-products', { userProducts });
    })
    .catch(err => next(err));
};

/**
 * user can remove a product they created
 */
module.exports.deleteProduct = (req, res, next) => {
  const { Product } = req.app.get('models');
  Product.destroy({
    where: {
      id: req.body._productId
    }
  })
    .then(() => {
      res.redirect('my-products');
    })
    .catch(err => next(err));
};

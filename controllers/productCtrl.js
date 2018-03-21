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
      res.render('add-product', data);
    });
    return;
  } else {
    // if no errors then post to the db
    // need to create using the sanitized product rather than the req.body
    product
      .save(() => {})
      .then(response => {
        // res.json(response);
        // console.log('RESPONSE FROM THE POST', response);
        res.redirect(`/products/${response.id}`);
      })
      .catch(err => {
        next(err);
      });
  }
};

/**
 * Gets product info from ID, along with # sold as 'sales'
 */
module.exports.getProductById = (req, res, next) => {
  const { Product, Order, sequelize } = req.app.get('models');
  Product.findById(req.params.id, {})
    .then(product => {
      // Product.count({
      //   where: { id: req.params.id },
      //   include: [
      //     {
      //       model: Order,
      //       where: {
      //         PaymentTypeId: {
      //           $ne: null
      //         }
      //       }
      //     }
      //   ]
      sequelize // raw query to count products in open order.
        .query(
          `SELECT  "ProductId", COUNT(*) as "productCount"
      FROM "OrdersProducts"
      WHERE "ProductId" = ${req.params.id}
      GROUP BY "ProductId"`,
          {
            type: sequelize.QueryTypes.SELECT
          }
        )
        .then(results => {
          let sales = 0;
          if (results[0]) {
            sales = results[0].productCount;
          }
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
  const { sequelize } = req.app.get('models');
  // Product.findAll({
  //   include: [{ model: Order }],
  //   where: {
  //     title: {
  //       $iLike: `%${req.query.title}%`
  //     }
  //   }
  // })
  sequelize // raw query to count products in open order.
    .query(
      `SELECT  "Products".*, COUNT("OrdersProducts"."ProductId") as "productCount"
    FROM "OrdersProducts"
    JOIN "Products"
    ON "OrdersProducts"."ProductId" =  "Products"."id"
    WHERE LOWER("Products"."title") LIKE LOWER('%${req.query.title}%')
    GROUP BY "Products"."id"`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    .then(products => {
      // res.json(products);
      res.render('products-search', { products });
    })
    .catch(err => next(err));
};

/**
 * user can view all of their products
 */
module.exports.showAllUserProducts = (req, res, next) => {
  const { Product, Order, Sequelize } = req.app.get('models');
  Product.findAll({
    // limiting find all to the current users products
    attributes: ['id', 'title', 'quantity'],
    where: { sellerUserId: req.session.passport.user.id },
    include: [
      {
        model: Order,
        through: {
          attributes: [[Sequelize.fn('COUNT', Sequelize.col('ProductId')), 'sales']],
          where: { $PaymentTypeId$: { $ne: null } },
          required: false
          // include: [{ model: Product }]
        }
      }
    ]

    // need the include to get an array of all orders that product is found on
    // only orders that have been completed should be returned
    // return ALL products regardless if they have orders on which they have been completed
    // without required: false the findAll will ONLY return products that have been on a completed order
  })
    .then(userProducts => {
      res.json(userProducts);
      // res.render('my-products', { userProducts });
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

/**
 * gets 20 most recently added products, renders home page
 */
module.exports.getLatestProducts = (req, res, next) => {
  const { sequelize } = req.app.get('models');

  //-----EXAMPLE SEQUELIZE QUERY------
  // Product.findAll({
  //   include: [
  //     {
  //       model: Order
  //     }
  //   ],
  //   order: [['createdAt', 'DESC']],
  //   limit: 20
  // })
  //   .then(latestProducts => {
  //     let countArr = [];
  //     latestProducts.forEach(latestProduct => {
  sequelize // raw query to count products in open order.
    .query(
      `SELECT  "Products".*, COUNT("OrdersProducts"."ProductId") as "productCount"
      FROM "OrdersProducts"
      JOIN "Products"
      ON "OrdersProducts"."ProductId" =  "Products"."id"
      GROUP BY "Products"."id"
      ORDER BY "Products"."createdAt" DESC
      LIMIT 20`,
      {
        type: sequelize.QueryTypes.SELECT
      }
    )
    .then(latestProducts => {
      // res.json(latestProducts);
      res.render('home', { latestProducts });
    })
    .catch(err => {
      next(err);
    });
};

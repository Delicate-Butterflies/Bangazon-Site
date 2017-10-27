'use strict';
/**@module Order-controller */

let currentOrder; //make current order global to the controller so that it can be used to update payment type later.

/**
 * getOpenOrder gets a user's open order or the current cart.
 */

module.exports.getOpenOrder = (req, res, next) => {
  const { Order, Product, sequelize } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //get current active user
  Order.findAll({
    include: [{ model: Product }],
    where: { customerUserId: activeUserId, PaymentTypeId: null }
  })
    .then(data => {
      currentOrder = data;
      if (data[0]) {
        sequelize // raw query to count products in open order.
          .query(
            `SELECT  "ProductId", COUNT(*) as "productCount" FROM "OrdersProducts" WHERE "OrderId" = ${data[0]
              .id} GROUP BY "ProductId"`,
            {
              type: sequelize.QueryTypes.SELECT
            }
          )
          .then(counts => {
            if (data[0].Products.length > 0) {
              let products = data[0].Products;
              res.render('cart', { products, counts });
            } else {
              deleteOrder(req, res, next); // if the order does not have any products left in it, delete the order.
            }
          });
      } else res.render('cart', data[0]); //if no open order
      //if there is an open order
    })
    .catch(err => {
      next(err);
    });
};

// module.exports.getOpenOrder = (req, res, next) => {
//   const { Order, Product, sequelize } = req.app.get('models');
//   // let {Sequelize} = require('sequelize');
//   let activeUserId = req.session.passport.user.id; //get current active user
//   sequelize
//     .query(`SELECT * FROM "Orders" WHERE "PaymentTypeId" = null`, {
//       type: sequelize.QueryTypes.SELECT
//     })
//     .then(orders => {
//       res.json(orders);
//     });
// };

/**
 * deletes the order by id. Helper function.
 */
let deleteOrder = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.destroy({ where: { id: currentOrder[0].id } })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      next(err);
    });
};

/**
 * savePaymentType saves the payment type on user's open order to complete it.
 */

module.exports.savePaymentType = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.update(
    { PaymentTypeId: req.body.paymentId },
    {
      where: { id: currentOrder[0].id }
    }
  )
    .then(() => {
      res.render('payment-confirmation');
    })
    .catch(err => {
      next(err);
    });
};

/**
 * removes products from the cart or the current open order!
 */
module.exports.removeProductFromCart = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  Order.findById(currentOrder[0].id, {
    include: [{ model: Product }]
  })
    .then(cart => {
      cart.removeProducts(req.params.productId);
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      next(err);
    });
};

/**
   * cancels the whole order. Removes all the rows associated with that order from database.
   */

module.exports.cancelOrder = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  Order.findById(currentOrder[0].id, {
    include: [{ model: Product }]
  })
    .then(cart => {
      cart.Products.forEach(product => {
        cart.removeProducts(product.id);
      });
    })
    .then(() => {
      deleteOrder(req, res, next);
    })
    .catch(err => {
      next(err);
    });
};

/**
* Get order details including products and total price
*/
module.exports.getUserOrderHistory = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.findAll({
    where: {
      customerUserId: req.params.id,
      $PaymentTypeId$: { $ne: null }
    }
  })
    .then(orders => {
      res.render('order-history', { orders });
    })
    .catch(err => {
      next(err);
    });
};

/**
* Get order details including products and total price
*/
module.exports.getUserOrderDetails = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  Order.findAll({
    include: [{ model: Product }],
    where: { id: req.params.id }
  })
    .then(results => {
      let orderDetails = results[0];
      res.render('order-details', { orderDetails });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * add new products to the cart
 */
module.exports.addProductToCart = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //get current active user
  Order.findAll({
    include: [{ model: Product }],
    where: { customerUserId: activeUserId, PaymentTypeId: null }
  })
    .then(theOrder => {
      if (theOrder[0]) {
        // if there is an open order
        Order.findById(theOrder[0].id, {
          include: [{ model: Product }]
        }).then(currentOrder => {
          currentOrder.addProducts(req.params.productId);
          res.redirect('/cart');
        });
      } else {
        createOrder(req, res, next); // if there is no open order, call createOrder
      }
    })
    .catch(err => {
      next(err);
    });
};

/**
 * helper function to create an order if there are no current open order.
 */
let createOrder = (req, res, next) => {
  let activeUserId = req.session.passport.user.id; //get current active user
  const { Order } = req.app.get('models');
  let orderObj = {
    orderDate: new Date().toISOString(),
    PaymentTypeId: null,
    customerUserId: activeUserId
  };
  Order.create(orderObj).then(() => {
    module.exports.addProductToCart(req, res, next);
  });
};

module.exports.upadteProductQtyinCart = (req, res, next) => {};

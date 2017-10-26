'use strict';
/**@module Order-controller */

let currentOrder; //make current order global to the controller so that it can be used to update payment type later.

/**
 * getOpenOrder gets a user's open order or the current cart.
 */

module.exports.getOpenOrder = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //get current active user
  Order.findAll({
    include: [{ model: Product }],
    where: { customerUserId: activeUserId, PaymentTypeId: null }
  })
    .then(data => {
      currentOrder = data;
      if (data[0]) {
        //if there is an open order
        if (data[0].Products.length > 0) {
          let products = data[0].Products;
          res.render('cart', { products });
        } else {
          deleteOrder(req, res, next); // if the order does not have any products left in it, delete the order.
        }
      } else res.render('cart', data[0]); //if no open order
    })
    .catch(err => {
      next(err);
    });
};

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
module.exports.getUserOrderDetails = (req, res, next) => {
  const { Order, Product } = req.app.get('models');
  Order.findAll({
    include: [{ model: Product }],
    where: { id: req.params.id }
  })
    .then(orderDetails => {
      res.json(orderDetails);
    })
    .catch(err => {
      next(err);
    });
};

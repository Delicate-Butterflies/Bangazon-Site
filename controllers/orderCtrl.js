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
    where: { customerUserId: activeUserId, paymentTypeId: null }
  }).then(data => {
    currentOrder = data;
    if (data[0]) {
      //if there is an open order
      let products = data[0].Products;
      res.render('cart', { products });
    } else res.render('cart', data[0]); //if no open order
  });
};

/**
 * savePaymentType saves the payment type on user's open order to complete it.
 */

module.exports.savePaymentType = (req, res, next) => {
  const { Order } = req.app.get('models');
  Order.update(
    { paymentTypeId: req.body.paymentId },
    {
      where: { id: currentOrder[0].id }
    }
  ).then(() => {
    res.render('payment-confirmation');
  });
};
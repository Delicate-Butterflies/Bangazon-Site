'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

module.exports.getCurrentUserAccountDetails = (req, res, next) => {
  const { User, PaymentType, Order } = req.app.get('models');
  const userDetails = {};
  User.findById(req.params.id, {}).then(user => {
    userDetails.user = user;
    PaymentType.findAll({
      // include: [{ all: true }],
      where: { customerUserId: req.params.id }
    }).then(paymentTypes => {
      userDetails.paymentType = paymentTypes;
      Order.findAll({
        where: {
          customerUserId: req.params.id,
          $PaymentTypeId$: { $ne: null }
        }
      })
        .then(orders => {
          userDetails.orders = orders;
          res.render('user-account', { userDetails });
          // res.json(userDetails);
        })
        .catch(err => {
          next(err);
        });
    });
  });
};

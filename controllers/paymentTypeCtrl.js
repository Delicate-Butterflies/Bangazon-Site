'use strict';
/** @module paymentTypeCtrl */

/**
 * get current user's payment types
 */
module.exports.getUserPaymentTypes = (req, res, next) => {
  let activeUserId = req.session.passport.user.id; //current active user
  const { PaymentType } = req.app.get('models');
  PaymentType.findAll({
    where: { customerUserId: activeUserId }
  })
    .then(paymentTypes => {
      res.render('payment-type', { paymentTypes });
    })
    .catch(err => {
      next(err);
    });
};

'use strict';

module.exports.getUserPaymentTypes = (req, res, next) => {
  let activeUserId = req.session.passport.user.id;
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

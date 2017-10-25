'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

// module.exports.getCurrentUserAccount = (req, res, next) => {
//   const { User, PaymentType } = req.app.get('models');
//   User.findById(req.params.id, {})
//     .then(user => {
//       // res.json(user);
//       res.render('user-account', { user });
//     })
//     .catch(err => {
//       next(err);
//     });
// };

// module.exports.getUserPaymentTypes = (req, res, next, renderPage) => {
//   let activeUserId = req.session.passport.user.id; //current active user
//   const { PaymentType } = req.app.get('models');
//   PaymentType.findAll({
//     where: { customerUserId: activeUserId }
//   })
//     .then(data => {
//       // res.json(data);
//       if (data.length > 0) {
//         let paymentTypes = data;
//         res.render('user-account', { paymentTypes });
//       } else res.render('user-account', data[0]);
//     })
//     .catch(err => {
//       next(err);
//     });
// };

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
          // res.render('user-account', { userDetails });
          res.json(userDetails);
        })
        .catch(err => {
          next(err);
        });
    });
  });
};

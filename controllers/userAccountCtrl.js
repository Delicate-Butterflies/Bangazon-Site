'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

module.exports.getCurrentUserAccountDetails = (req, res, next) => {
  const { User, PaymentType, Order } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //current active user
  User.findById(activeUserId, {})
    .then(user => {
      res.render('user-account', { user });
    })
    .catch(err => {
      next(err);
    });
};

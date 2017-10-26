'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

module.exports.getCurrentUserAccountDetails = (req, res, next) => {
  const { User, PaymentType, Order } = req.app.get('models');
  const userDetails = {};
  User.findById(req.params.id, {})
    .then(user => {
      res.render('user-account', { user });
      // res.json(userDetails);
    })
    .catch(err => {
      next(err);
    });
};

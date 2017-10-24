'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

module.exports.getCurrentUserAccount = (req, res, next) => {
  const { User } = req.app.get('models');
  User.findById(req.params.id, {})
    .then(user => {
      res.json(user);
      // res.render('user-account', { user });
    })
    .catch(err => {
      next(err);
    });
};

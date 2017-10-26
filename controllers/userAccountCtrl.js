'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */
module.exports.getCurrentUserAccountDetails = (req, res, next) => {
  const { User } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //current active user
  User.findById(activeUserId, {})
    .then(user => {
      res.render('user-account', { user });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Get the current user's account information and render form
 */
module.exports.showEditAccountForm = (req, res, next) => {
  const { User } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //current active user
  User.findById(activeUserId, {})
    .then(user => {
      res.render('edit-account', { user });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.editUserAccount = (req, res, next) => {
  const { User } = req.app.get('models');
  let activeUserId = req.session.passport.user.id; //current active user
  let { firstName, lastName, username, email, phoneNumber, streetAddress, cityAddress, stateCode, zipCode } = req.body;
  User.update(req.body, {
    where: { id: activeUserId },
    fields: {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      streetAddress,
      cityAddress,
      stateCode,
      zipCode
    }
  }).then(user => {
    res.redirect('/account');
  });
};

'use strict';

/** @module User Account Controller */

/**
 * Get the current user's account information
 */

module.exports.getCurrentUserAccount = (req, res, next) => {
  res.render('user-account');
};

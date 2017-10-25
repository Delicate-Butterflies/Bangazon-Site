'use strict';
/** @module profileCtrl */

/**
 * show the user's profile
 */
module.exports.showUserProfile = (req, res, next) => {
	let activeUserName = req.session.passport.user.username; //current active user
	res.render('profile', { activeUserName });
};

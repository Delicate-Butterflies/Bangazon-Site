'use strict';

const { Router } = require('express');
const router = Router();

const { showUserProfile } = require('../controllers/profileCtrl');

router.get('/profile', isLoggedIn, showUserProfile);
module.exports = router;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

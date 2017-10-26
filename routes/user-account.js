'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccountDetails } = require('../controllers/userAccountCtrl');

router.get('/account', isLoggedIn, getCurrentUserAccountDetails);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

module.exports = router;

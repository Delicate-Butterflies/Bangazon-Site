'use strict';

const { Router } = require('express');
const router = Router();

const { getOpenOrder } = require('../controllers/orderCtrl');

router.get('/cart', isLoggedIn, getOpenOrder);
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

'use strict';

const { Router } = require('express');
const router = Router();

const { getOpenOrder, savePaymentType } = require('../controllers/orderCtrl');

router.get('/cart', isLoggedIn, getOpenOrder);
router.post('/add-payment', isLoggedIn, savePaymentType);
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

'use strict';

const { Router } = require('express');
const router = Router();

const { getUserPaymentTypes, savePaymentType } = require('../controllers/paymentTypeCtrl');

router.get('/payment-types', isLoggedIn, getUserPaymentTypes);
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

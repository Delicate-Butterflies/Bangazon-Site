'use strict';

const { Router } = require('express');
const router = Router();

const { getOpenOrder, savePaymentType, removeProductFromCart, cancelOrder } = require('../controllers/orderCtrl');

router.get('/cart', isLoggedIn, getOpenOrder);
router.post('/cart', isLoggedIn, cancelOrder);
router.post('/add-payment', isLoggedIn, savePaymentType);
router.post('/cart/remove/:productId', isLoggedIn, removeProductFromCart);
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}
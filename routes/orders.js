'use strict';

const { Router } = require('express');
const router = Router();

const {
  getOpenOrder,
  savePaymentType,
  removeProductFromCart,
  cancelOrder,
  addProductToCart,
  getUserOrderHistory,
  getUserOrderDetails,
  upadteProductQtyinCart
} = require('../controllers/orderCtrl');

router.get('/cart', isLoggedIn, getOpenOrder);
router.post('/cart', isLoggedIn, cancelOrder);
router.post('/add-payment', isLoggedIn, savePaymentType);
router.post('/cart/add-product/:productId', isLoggedIn, addProductToCart);
router.post('/cart/remove/:productId', isLoggedIn, removeProductFromCart);
router.post('/cart/update/:productId', isLoggedIn, upadteProductQtyinCart);
router.get('/order-history', isLoggedIn, getUserOrderHistory);
router.get('/order/:id', isLoggedIn, getUserOrderDetails);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

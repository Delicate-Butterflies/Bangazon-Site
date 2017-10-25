'use strict';

const { Router } = require('express');
const router = Router();

const { showAllUserProducts, deleteProduct } = require('../controllers/productCtrl');

router.get('/my-products', isLoggedIn, showAllUserProducts);
router.post('/my-products', isLoggedIn, deleteProduct);
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

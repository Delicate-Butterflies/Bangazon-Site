'use strict';

const { Router } = require('express');
const router = Router();

const { getProductById, searchProductsByName } = require('../controllers/productCtrl');

// show product details by id
router.get('/products/:id', getProductById);
router.get('/products', searchProductsByName);

module.exports = router;

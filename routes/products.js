'use strict';

const { Router } = require('express');
const router = Router();

const { getProductById } = require('../controllers/productCtrl');

// show product details by id
router.get('/products/:id', getProductById);

module.exports = router;

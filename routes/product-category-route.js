'use strict';

const { Router } = require('express');
const router = Router();
const {
  listProductCategory
} = require('../controllers/product-category-ctrl');

// lists departments
router.get('/product-categories', listProductCategory);

module.exports = router;
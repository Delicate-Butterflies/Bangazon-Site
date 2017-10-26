'use strict';

const { Router } = require('express');
const router = Router();

const { getAllProductTypes, getProductTypeById } = require('../controllers/productTypeCtrl.js');

router.get('/product-types', getAllProductTypes);
router.get('/product-types/:id', getProductTypeById);

module.exports = router;

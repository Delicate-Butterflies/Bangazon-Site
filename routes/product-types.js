'use strict';

const { Router } = require('express');
const router = Router();

const { getAllProductTypes } = require('../controllers/productTypeCtrl.js');

router.get('/product-types', getAllProductTypes);

module.exports = router;

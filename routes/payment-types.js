'use strict';

const { Router } = require('express');
const router = Router();

const { listUserPaymentTypes, showAddPaymentTypeForm } = require('../controllers/paymentTypeCtrl');

// show product details by id
router.get('/payment-types', listUserPaymentTypes);
router.get('/payment-types/add', showAddPaymentTypeForm);

module.exports = router;

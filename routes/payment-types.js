'use strict';

const { Router } = require('express');
const router = Router();

const {
	listUserPaymentTypes,
	showAddPaymentTypeForm,
	createPaymentType,
	getUserPaymentTypes,
	removePaymentType
} = require('../controllers/paymentTypeCtrl');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

router.get('/payment-types-list', listUserPaymentTypes);
router.get('/payment-types/add', showAddPaymentTypeForm);

router.post('/payment-types', isLoggedIn, createPaymentType);

router.get('/payment-types', isLoggedIn, getUserPaymentTypes);
router.post('/payment-types/:productId', isLoggedIn, removePaymentType);

module.exports = router;

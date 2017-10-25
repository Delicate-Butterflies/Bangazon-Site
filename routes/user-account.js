'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccountDetails } = require('../controllers/userAccountCtrl');
// const { getUserPaymentTypes } = require('../controllers/paymentTypeCtrl');

router.get('/account/:id', getCurrentUserAccountDetails);

module.exports = router;

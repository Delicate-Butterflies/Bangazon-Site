'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccountDetails } = require('../controllers/userAccountCtrl');
const { getUserOrderDetails } = require('../controllers/orderCtrl');

router.get('/account/:id', getCurrentUserAccountDetails);
router.get('/order/:id', getUserOrderDetails);

module.exports = router;

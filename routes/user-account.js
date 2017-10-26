'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccountDetails } = require('../controllers/userAccountCtrl');

router.get('/account', getCurrentUserAccountDetails);

module.exports = router;

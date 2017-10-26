'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccountDetails } = require('../controllers/userAccountCtrl');

router.get('/account/:id', getCurrentUserAccountDetails);

module.exports = router;

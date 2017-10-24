'use strict';

const { Router } = require('express');
const router = Router();

const { getCurrentUserAccount } = require('../controllers/userAccountCtrl');

router.get('/account/:id', getCurrentUserAccount);

module.exports = router;

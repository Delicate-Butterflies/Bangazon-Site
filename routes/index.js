'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

// pipe all other requests through the route modules
router.use(require('./authRoute'));
router.use(require('./product-add'));
router.use(require('./orders'));
// router.use(require('./paymentTypes'));
router.use(require('./product-types'));
router.use(require('./products'));
router.use(require('./payment-types'));
router.use(require('./profile'));

module.exports = router;

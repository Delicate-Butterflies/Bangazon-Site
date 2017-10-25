'use strict';
/** @module paymentTypeCtrl */

/**
 * get current user's payment types
 */
module.exports.getUserPaymentTypes = (req, res, next) => {
	let activeUserId = req.session.passport.user.id; //current active user
	const { PaymentType } = req.app.get('models');
	PaymentType.findAll({
		where: { customerUserId: activeUserId }
	})
		.then(data => {
			// res.json(data);
			if (data.length > 0) {
				let paymentTypes = data;
				res.render('payment-type', { paymentTypes });
			} else res.render('payment-type', data[0]);
		})
		.catch(err => {
			next(err);
		});
};

/**
 * list user payment types for profile page
 */
module.exports.listUserPaymentTypes = (req, res, next) => {
	let activeUserId = req.session.passport.user.id;
	const { PaymentType } = req.app.get('models');
	PaymentType.findAll({
		where: { customerUserId: activeUserId }
	})
		.then(data => {
			// res.json(data);
			if (data.length > 0) {
				let paymentTypes = data;
				res.render('payment-types-list', { paymentTypes });
			} else res.render('payment-types-list', data[0]);
		})
		.catch(err => {
			next(err);
		});
};

/**
 * show the user the form to add a payment type
 */
module.exports.showAddPaymentTypeForm = (req, res, next) => {
	res.render('payment-type-add', {});
};

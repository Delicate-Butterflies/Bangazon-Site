'use strict';

module.exports.productDropdownInformation = (req, res, next) => {
	const { ProductType } = req.app.get('models');
	ProductType.findAll()
		.then(prodTypes => {
			res.partial('/partials/nav', prodTypes);
		})
		.catch(err => {
			next(err);
		});
};

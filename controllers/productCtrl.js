'use strict';

/** @module Product Controller */

/**
 * Get single product and render 'product-details'
 */
module.exports.getProductById = (req, res, next) => {
	const { Product, Order } = req.app.get('models');
	Product.findById(req.params.id, {})
		.then(product => {
			Product.count({
				where: { id: req.params.id },
				include: [
					{
						model: Order,
						where: {
							PaymentTypeId: {
								$ne: null
							}
						}
					}
				]
			}).then(sales => {
				res.render('product-details', { product, sales });
			});
		})
		.catch(err => {
			next(err);
		});
};

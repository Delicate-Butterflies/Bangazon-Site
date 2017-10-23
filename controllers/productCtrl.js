'use strict';

/** @module Product Controller */

/**
 * Get single product and render 'product-details'
 */
module.exports.getProductById = (req, res, next) => {
	const { Product } = req.app.get('models');
	Product.findById(req.params.id)
		.then(product => {
			// res.json(product);
			res.render('product-details', { product });
		})
		.catch(err => {
			next(err);
		});
};

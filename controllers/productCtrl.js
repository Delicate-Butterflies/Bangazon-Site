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

/**
 * Get list of products that contain the search string
 */
module.exports.searchProductsByName = (req, res, next) => {
	const { Product, Order } = req.app.get('models');
	Product.findAll({
		where: {
			title: {
				$iLike: `%${req.query.title}%`
			}
		}
	})
		.then(products => res.render('products-search', { products }))
		.catch(err => next(err));
};
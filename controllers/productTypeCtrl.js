'use strict';

// const sequelize = require('sequelize');

/** @module Product Type Controller */

/**
 * Get all product types and associated products and render 'product-types'
 */

module.exports.getAllProductTypes = (req, res, next) => {
	const { ProductType, Product } = req.app.get('models');
	ProductType.findAll({
		include: { model: Product }
	})
		.then(productTypes => {
			// res.json(productTypes);
			res.render('product-types', { productTypes });
		})
		.catch(err => {
			next(err);
		});
};

/**
 * Get a product type by ID and render 'product-types/:id' with info
 */
module.exports.getProductTypeById = (req, res, next) => {
	const { ProductType, Product, Order, sequelize } = req.app.get('models');
	ProductType.findById(req.params.id, {
		include: [
			{
				model: Product
				// where: { ProductTypeId: req.params.id }
			}
		]
	})
		.then(productType => {
			// res.json(productType);
			sequelize // raw query to count products in open order.
				.query(
					`SELECT "Products"."id", COUNT("Products"."id") as "sales"
				FROM "ProductTypes"
				JOIN "Products"
				ON "Products"."ProductTypeId" = ${req.params.id}
				LEFT JOIN "OrdersProducts"
				ON "OrdersProducts"."ProductId" = "Products"."id"
				LEFT JOIN "Orders"
				ON "OrdersProducts"."OrderId" = "Orders"."id"
				WHERE "Orders"."PaymentTypeId" IS NOT NULL
				GROUP BY "Products"."id"`,
					{ type: sequelize.QueryTypes.SELECT }
				)
				.then(counts => {
					// res.json(counts);
					productType.Products.forEach(product => {
						counts.forEach(sales => {
							if (sales.id == product.id) {
								product.sales = sales.sales;
							}
						});
					});
					// res.json(productType.Products);
					res.render('products-of-a-type', { productType });
				})
				.catch(err => {
					next(err);
				});
		})
		.catch(err => {
			next(err);
		});
};

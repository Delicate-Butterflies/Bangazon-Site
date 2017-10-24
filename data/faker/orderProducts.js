'use strict';

const faker = require('faker');

const {
	amounts: { maxQuantity, maxProductsPerOrder, numProducts, numOrders }
} = require('./generatorAmounts.json');
let fs = require('fs');

let orderProducts = [];

for (let k = 1; k <= numOrders; k++) {
	//for each order
	let OrderId = k;
	// randomize the number of products per order up to max
	let uniqueProducts = Math.floor(Math.random() * maxProductsPerOrder) + 1;
	// for each product "slot"
	for (let j = 0; j < uniqueProducts; j++) {
		// choose random product out of the total number of products
		let ProductId = Math.floor(Math.random() * numProducts) + 1;
		// randomize the quantity pushed to array (ordered) between 1 and an upper limit
		let qty = Math.floor(Math.random() * maxQuantity) + 1;
		for (let i = 0; i < qty; i++) {
			let createdAt = faker.date.past().toISOString();
			let updatedAt = new Date().toISOString();

			orderProducts.push({
				ProductId,
				OrderId,
				updatedAt,
				createdAt
			});
		}
	}
}

orderProducts = JSON.stringify(orderProducts);

fs.writeFile('../orders-products.json', orderProducts, err => {
	if (err) console.log('error!', err);
});

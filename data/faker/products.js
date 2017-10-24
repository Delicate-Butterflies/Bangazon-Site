'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');
const {
	amounts: { numProducts, numProductTypes, numUsers }
} = require('./generatorAmounts.json');
let fs = require('fs');

let products = [];

for (let i = 0; i < numProducts; i++) {
	let title = faker.commerce.productName();
	let price = faker.commerce.price() / 10;
	let description = faker.lorem.sentence();
	let ProductTypeId = Math.floor(Math.random() * numProductTypes) + 1;
	let sellerUserId = Math.floor(Math.random() * numUsers) + 1;
	let quantity = Math.floor(faker.random.number() / 1000);
	let updatedAt = new Date().toISOString();
	let createdAt = faker.date.past().toISOString();
	let pictureUrl = '/public/images/500x500.png';

	products.push({
		title,
		price,
		description,
		ProductTypeId,
		sellerUserId,
		quantity,
		pictureUrl,
		updatedAt,
		createdAt
	});
}

products = JSON.stringify(products);

fs.writeFile('../products.json', products, err => {
	if (err) console.log('error!', err);
});

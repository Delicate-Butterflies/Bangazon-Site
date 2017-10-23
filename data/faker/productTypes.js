'use strict';
// using Faker to generate a some product types
const faker = require('faker');
const { amounts: { numProductTypes } } = require('./generatorAmounts.json');
let fs = require('fs');

let types = [];

for (let i = 0; i < numProductTypes; i++) {
	let name = faker.commerce.department();
	let updatedAt = new Date().toISOString();
	let createdAt = faker.date.past().toISOString();

	types.push({
		name,
		updatedAt,
		createdAt
	});
}

let prodTypes = JSON.stringify(types);

fs.writeFile('../product-types.json', prodTypes, err => {
	if (err) console.log('error!', err);
});

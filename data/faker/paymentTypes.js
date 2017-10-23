'use strict';

// using Faker to generate a pile of product types and products
const faker = require('faker');
const {
	amounts: { numPaymentTypes, numUsers }
} = require('./generatorAmounts.json');
let fs = require('fs');

let payments = [];

for (let i = 0; i < numPaymentTypes; i++) {
	let customerUserId = Math.floor(Math.random() * numUsers) + 1;
	let type = faker.finance.accountName();
	let accountNumber = faker.finance.account();
	let updatedAt = new Date().toISOString();
	let createdAt = faker.date.past().toISOString();

	payments.push({
		customerUserId,
		type,
		accountNumber,
		updatedAt,
		createdAt
	});
}

payments = JSON.stringify(payments);

fs.writeFile('../payment-types.json', payments, err => {
	if (err) console.log('error!', err);
});

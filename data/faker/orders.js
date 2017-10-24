'use strict';

// using Faker to generate orders
const faker = require('faker');
const {
	amounts: { numOrders, numUsers, numPaymentTypes }
} = require('./generatorAmounts.json');
let fs = require('fs');

let orders = [];

for (let i = 0; i < numOrders; i++) {
	let orderDate = faker.date.past().toISOString(); //generates an ISO formate date string
	let customerUserId = Math.floor(Math.random() * numUsers) + 1;
	let PaymentTypeId = null;
	let closedOrderChance = Math.floor(Math.random() * 100);
	if (closedOrderChance > 50) {
		PaymentTypeId = Math.floor(Math.random() * numPaymentTypes) + 1;
	}
	let createdAt = faker.date.past().toISOString();
	let updatedAt = new Date().toISOString();

	orders.push({
		orderDate,
		PaymentTypeId,
		customerUserId,
		updatedAt,
		createdAt
	});
}

orders = JSON.stringify(orders);

fs.writeFile('../orders.json', orders, err => {
	if (err) console.log('error!', err);
});

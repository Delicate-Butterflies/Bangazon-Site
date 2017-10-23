'use strict';

// generate a bunch of customers with Faker
const faker = require('faker');
const { amounts: { numUsers } } = require('./generatorAmounts.json');
let fs = require('fs');

let users = [];

for (let i = 0; i < numUsers; i++) {
	let firstName = faker.name.firstName();
	let lastName = faker.name.lastName();
	let createdAt = faker.date.past().toISOString();
	let recent_date = faker.date.recent().toISOString();
	let lastLoginDate = faker.date.between(createdAt, recent_date).toISOString();
	let phoneNumber = faker.phone.phoneNumberFormat();
	let email = faker.internet.email();
	let username = faker.internet.userName();
	let password = faker.internet.password();
	let streetAddress = faker.address.streetAddress();
	let cityAddress = faker.address.city();
	let stateCode = faker.address.stateAbbr();
	let zipCode = faker.address.zipCode();
	let updatedAt = new Date().toISOString();

	users.push({
		firstName,
		lastName,
		createdAt,
		lastLoginDate,
		phoneNumber,
		streetAddress,
		cityAddress,
		stateCode,
		zipCode,
		email,
		username,
		password,
		updatedAt
	});
}

let usersJSONSTRING = JSON.stringify(users);

fs.writeFile('../users.json', usersJSONSTRING, err => {
	if (err) console.log('error!', err);
});

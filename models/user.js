'use strict';
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		firstName: DataTypes.STRING,
		lastName: DataTypes.STRING,
		email: DataTypes.STRING,
		username: DataTypes.TEXT,
		password: DataTypes.STRING,
		streetAddress: DataTypes.STRING,
		cityAddress: DataTypes.STRING,
		stateCode: DataTypes.STRING,
		zipCode: DataTypes.STRING,
		phoneNumber: DataTypes.STRING,
		lastLoginDate: DataTypes.DATE
	});

	User.associate = function(models) {
		User.hasMany(models.product, {
			foreignKey: 'sellerUserId'
		});
	};

	User.associate = function(models) {
		User.hasMany(models.order, {
			foreignKey: 'customerUserId'
		});
	};

	User.associate = function(models) {
		User.hasMany(models.PaymentType, {
			foreignKey: 'customerUserId'
		});
	};

	return User;
};

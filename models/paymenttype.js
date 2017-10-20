'use strict';
module.exports = (sequelize, DataTypes) => {
	var paymentType = sequelize.define('paymentType', {
		type: DataTypes.STRING,
		customerUserId: DataTypes.INTEGER,
		accountNumber: DataTypes.INTEGER
	});

	paymentType.associate = models => {
		paymentType.hasMany(models.order, {
			foreignKey: 'paymentTypeId'
		});

		paymentType.belongsToOne(models.user, {
			foreignKey: 'customerUserId'
		});
	};

	return paymentType;
};

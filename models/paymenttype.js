'use strict';
module.exports = (sequelize, DataTypes) => {
	var PaymentType = sequelize.define('PaymentType', {
		type: DataTypes.STRING,
		customerUserId: DataTypes.INTEGER,
		accountNumber: DataTypes.INTEGER
	});

	PaymentType.associate = models => {
		PaymentType.hasMany(models.order, {
			foreignKey: 'paymentTypeId'
		});

		PaymentType.belongsToOne(models.user, {
			foreignKey: 'customerUserId'
		});
	};

	return PaymentType;
};

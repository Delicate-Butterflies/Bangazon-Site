'use strict';
module.exports = (sequelize, DataTypes) => {
	var PaymentType = sequelize.define('PaymentType', {
		type: DataTypes.STRING,
		customerUserId: DataTypes.INTEGER,
		accountNumber: DataTypes.INTEGER
	});

	PaymentType.associate = models => {
		PaymentType.hasMany(models.Order, {
			foreignKey: 'paymentTypeId'
		});

		PaymentType.belongsTo(models.User, {
			foreignKey: 'customerUserId'
		});
	};

	return PaymentType;
};

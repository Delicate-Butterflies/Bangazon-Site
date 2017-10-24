'use strict';
module.exports = (sequelize, DataTypes) => {
	var PaymentType = sequelize.define('PaymentType', {
		type: DataTypes.STRING,
		customerUserId: DataTypes.INTEGER,
		accountNumber: DataTypes.INTEGER
	});

	PaymentType.associate = models => {
		PaymentType.hasMany(models.Order, {
			foreignKey: 'PaymentTypeId'
		});

		PaymentType.belongsTo(models.User, {
			foreignKey: 'id'
		});
	};

	return PaymentType;
};

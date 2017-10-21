'use strict';
module.exports = (sequelize, DataTypes) => {
	var Order = sequelize.define('Order', {
		orderDate: DataTypes.DATEONLY,
		paymentTypeId: DataTypes.INTEGER,
		customerUserId: DataTypes.INTEGER
	});

	Order.associate = models => {
		Order.belongsToMany(models.product, {
			through: 'ordersProducts',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});

		Order.belongsToOne(models.paymentType, {
			foreignKey: 'paymentTypeId'
		});

		Order.belongsToOne(models.user, {
			foreignKey: 'customerUserId'
		});
	};

	return Order;
};

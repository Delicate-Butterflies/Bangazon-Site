'use strict';
module.exports = (sequelize, DataTypes) => {
	var order = sequelize.define('order', {
		orderDate: DataTypes.DATEONLY,
		paymentTypeId: DataTypes.INTEGER,
		customerUserId: DataTypes.INTEGER
	});

	order.associate = models => {
		order.belongsToMany(models.product, {
			through: 'ordersProducts',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});

		order.belongsToOne(models.paymentType, {
			foreignKey: 'paymentTypeId'
		});

		order.belongsToOne(models.user, {
			foreignKey: 'customerUserId'
		});
	};

	return order;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
	var product = sequelize.define('product', {
		title: DataTypes.STRING,
		price: DataTypes.DECIMAL,
		description: DataTypes.STRING,
		productTypeId: DataTypes.INTEGER,
		sellerUserId: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER
	});

	product.associate = models => {
		product.belongsToMany(models.order, {
			through: 'ordersProducts'
		});

		product.hasOne(models.productType, {
			foreignKey: 'productTypeId'
		});

		product.hasOne(models.user, {
			foreignKey: 'sellerUserId'
		});
	};

	return product;
};

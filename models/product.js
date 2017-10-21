'use strict';
module.exports = (sequelize, DataTypes) => {
	var Product = sequelize.define('Product', {
		title: DataTypes.STRING,
		price: DataTypes.DECIMAL,
		description: DataTypes.STRING,
		productTypeId: DataTypes.INTEGER,
		sellerUserId: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER
	});

	Product.associate = models => {
		Product.belongsToMany(models.order, {
			through: 'ordersProducts'
		});

		Product.hasOne(models.productType, {
			foreignKey: 'productTypeId'
		});

		Product.hasOne(models.user, {
			foreignKey: 'sellerUserId'
		});
	};

	return Product;
};

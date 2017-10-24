'use strict';
module.exports = (sequelize, DataTypes) => {
	var Product = sequelize.define('Product', {
		title: DataTypes.STRING,
		price: DataTypes.DECIMAL,
		description: DataTypes.STRING,
		ProductTypeId: DataTypes.INTEGER,
		sellerUserId: DataTypes.INTEGER,
		quantity: DataTypes.INTEGER,
		pictureUrl: DataTypes.STRING
	});

	Product.associate = models => {
		Product.belongsToMany(models.Order, {
			through: 'OrdersProducts'
		});

		Product.hasOne(models.ProductType, {
			foreignKey: 'id'
		});

		Product.hasOne(models.User, {
			foreignKey: 'id'
		});
	};

	return Product;
};

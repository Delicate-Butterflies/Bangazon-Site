'use strict';
module.exports = (sequelize, DataTypes) => {
	var productType = sequelize.define('productType', {
		name: DataTypes.STRING
	});

	productType.associate = models => {
		productType.hasMany(models.product, {
			foreignKey: 'productTypeId'
		});
	};

	return productType;
};

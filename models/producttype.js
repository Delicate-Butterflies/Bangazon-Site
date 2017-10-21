'use strict';
module.exports = (sequelize, DataTypes) => {
	var ProductType = sequelize.define('ProductType', {
		name: DataTypes.STRING
	});

	ProductType.associate = models => {
		ProductType.hasMany(models.product, {
			foreignKey: 'productTypeId'
		});
	};

	return ProductType;
};

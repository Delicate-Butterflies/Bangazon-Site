'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductType = sequelize.define(
    'ProductType',
    {
      name: DataTypes.STRING
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  ProductType.associate = models => {
    ProductType.hasMany(models.Product, {
      foreignKey: 'ProductTypeId'
    });
  };

  return ProductType;
};

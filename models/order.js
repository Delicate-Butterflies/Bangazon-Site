'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'Order',
    {
      orderDate: DataTypes.DATEONLY,
      PaymentTypeId: DataTypes.INTEGER,
      customerUserId: DataTypes.INTEGER
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  Order.associate = models => {
    Order.belongsToMany(models.Product, {
      through: 'OrdersProducts',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    Order.belongsTo(models.PaymentType, {
      foreignKey: 'id'
    });

    Order.belongsTo(models.User, {
      foreignKey: 'id'
    });
  };

  return Order;
};

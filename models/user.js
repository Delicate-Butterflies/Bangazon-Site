'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.TEXT,
    password: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    cityAddress: DataTypes.STRING,
    stateCode: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING
  });

  user.associate = function(models) {
    user.hasMany(models.product, {
      foreignKey: 'sellerUserId'
    });
  };

  user.associate = function(models) {
    user.hasMany(models.order, {
      foreignKey: 'customerUserId'
    });
  };

  user.associate = function(models) {
    user.hasMany(models.payment_type, {
      foreignKey: 'customerUserId'
    });
  };

  return User;
};

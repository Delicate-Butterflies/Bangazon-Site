'use strict';
module.exports = (sequelize, DataTypes) => {
	var PaymentType = sequelize.define(
		'PaymentType',
		{
			type: DataTypes.STRING,
			customerUserId: DataTypes.INTEGER,
			accountNumber: {
				type: DataTypes.STRING,
				validate: {
					isNumeric: true
				}
			}
		},
		{
			timestamps: true,
			paranoid: true
		}
	);

	PaymentType.associate = models => {
		PaymentType.hasMany(models.Order, {
			foreignKey: 'PaymentTypeId'
		});

		PaymentType.belongsTo(models.User, {
			foreignKey: 'id'
		});
	};

	return PaymentType;
};

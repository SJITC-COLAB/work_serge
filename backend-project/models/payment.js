// models/payment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    paymentNumber: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    PaymentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    RecordNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      references: {
        model: 'service_packages',
        key: 'RecordNumber'
      }
    }
  }, {
    tableName: 'payments',
    timestamps: true,
    indexes: [
      {
        name: 'idx_payment_service_package',
        fields: ['RecordNumber']
      }
    ]
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.ServicePackage, {
      foreignKey: 'RecordNumber',
      as: 'servicePackage'
    });
  };

  return Payment;
};
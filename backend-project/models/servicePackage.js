// models/servicePackage.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ServicePackage = sequelize.define('ServicePackage', {
    RecordNumber: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    serviceDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    plateNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'cars',
        key: 'plateNumber'
      }
    },
    packageNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: 'packages',
        key: 'packageNumber'
      }
    }
  }, {
    tableName: 'service_packages',
    timestamps: true,
    indexes: [
      {
        name: 'idx_service_package_car',
        fields: ['plateNumber']
      },
      {
        name: 'idx_service_package_package',
        fields: ['packageNumber']
      }
    ]
  });

  ServicePackage.associate = (models) => {
    ServicePackage.belongsTo(models.Car, {
      foreignKey: 'plateNumber',
      as: 'car'
    });
    
    ServicePackage.belongsTo(models.Package, {
      foreignKey: 'packageNumber',
      as: 'package'
    });
    
    ServicePackage.hasOne(models.Payment, {
      foreignKey: 'RecordNumber',
      as: 'payment'
    });
  };

  return ServicePackage;
};
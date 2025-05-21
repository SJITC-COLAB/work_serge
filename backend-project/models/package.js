// models/package.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Package = sequelize.define('Package', {
    packageNumber: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    packageName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    packageDescription: {
      type: DataTypes.TEXT
    },
    packagePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'packages',
    timestamps: true
  });

  Package.associate = (models) => {
    Package.hasMany(models.ServicePackage, {
      foreignKey: 'packageNumber',
      as: 'servicePackages'
    });
  };

  return Package;
};
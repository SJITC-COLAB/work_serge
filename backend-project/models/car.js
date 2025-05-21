
// models/car.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Car = sequelize.define('Car', {
    plateNumber: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false
    },
    carType: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    carSize: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    driverName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'cars',
    timestamps: true
  });

  Car.associate = (models) => {
    Car.hasMany(models.ServicePackage, {
      foreignKey: 'plateNumber',
      as: 'servicePackages'
    });
  };

  return Car;
};
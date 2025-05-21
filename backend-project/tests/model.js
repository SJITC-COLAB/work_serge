// // models/package.js
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Package = sequelize.define('Package', {
//     packageNumber: {
//       type: DataTypes.STRING(20),
//       primaryKey: true,
//       allowNull: false
//     },
//     packageName: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     packageDescription: {
//       type: DataTypes.TEXT
//     },
//     packagePrice: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false
//     }
//   }, {
//     tableName: 'packages',
//     timestamps: true
//   });

//   Package.associate = (models) => {
//     Package.hasMany(models.ServicePackage, {
//       foreignKey: 'packageNumber',
//       as: 'servicePackages'
//     });
//   };

//   return Package;
// };

// // models/car.js
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Car = sequelize.define('Car', {
//     plateNumber: {
//       type: DataTypes.STRING(20),
//       primaryKey: true,
//       allowNull: false
//     },
//     carType: {
//       type: DataTypes.STRING(50),
//       allowNull: false
//     },
//     carSize: {
//       type: DataTypes.STRING(20),
//       allowNull: false
//     },
//     driverName: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     phoneNumber: {
//       type: DataTypes.STRING(20),
//       allowNull: false
//     }
//   }, {
//     tableName: 'cars',
//     timestamps: true
//   });

//   Car.associate = (models) => {
//     Car.hasMany(models.ServicePackage, {
//       foreignKey: 'plateNumber',
//       as: 'servicePackages'
//     });
//   };

//   return Car;
// };

// // models/servicePackage.js
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const ServicePackage = sequelize.define('ServicePackage', {
//     RecordNumber: {
//       type: DataTypes.STRING(20),
//       primaryKey: true,
//       allowNull: false
//     },
//     serviceDate: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     plateNumber: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       references: {
//         model: 'cars',
//         key: 'plateNumber'
//       }
//     },
//     packageNumber: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       references: {
//         model: 'packages',
//         key: 'packageNumber'
//       }
//     }
//   }, {
//     tableName: 'service_packages',
//     timestamps: true,
//     indexes: [
//       {
//         name: 'idx_service_package_car',
//         fields: ['plateNumber']
//       },
//       {
//         name: 'idx_service_package_package',
//         fields: ['packageNumber']
//       }
//     ]
//   });

//   ServicePackage.associate = (models) => {
//     ServicePackage.belongsTo(models.Car, {
//       foreignKey: 'plateNumber',
//       as: 'car'
//     });
    
//     ServicePackage.belongsTo(models.Package, {
//       foreignKey: 'packageNumber',
//       as: 'package'
//     });
    
//     ServicePackage.hasOne(models.Payment, {
//       foreignKey: 'RecordNumber',
//       as: 'payment'
//     });
//   };

//   return ServicePackage;
// };

// // models/payment.js
// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//   const Payment = sequelize.define('Payment', {
//     paymentNumber: {
//       type: DataTypes.STRING(20),
//       primaryKey: true,
//       allowNull: false
//     },
//     amountPaid: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false
//     },
//     PaymentDate: {
//       type: DataTypes.DATE,
//       allowNull: false
//     },
//     RecordNumber: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       unique: true,
//       references: {
//         model: 'service_packages',
//         key: 'RecordNumber'
//       }
//     }
//   }, {
//     tableName: 'payments',
//     timestamps: true,
//     indexes: [
//       {
//         name: 'idx_payment_service_package',
//         fields: ['RecordNumber']
//       }
//     ]
//   });

//   Payment.associate = (models) => {
//     Payment.belongsTo(models.ServicePackage, {
//       foreignKey: 'RecordNumber',
//       as: 'servicePackage'
//     });
//   };

//   return Payment;
// };

// // models/index.js
// const { Sequelize } = require('sequelize');
// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);
// const db = {};

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     port: process.env.DB_PORT || 3306,
//     logging: false, // Set to console.log to see SQL queries
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// );

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js'
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
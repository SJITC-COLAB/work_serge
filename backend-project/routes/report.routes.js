// routes/report.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Car = db.Car;
const ServicePackage = db.ServicePackage;
const Package = db.Package;

router.get('/summary', async (req, res) => {
  try {
    const [carCount, servicePackageCount, packageCount] = await Promise.all([
      Car.count(),
      ServicePackage.count(),
      Package.count(),
    ]);

    const servicePackagesByCar = await Car.findAll({
      include: [{ model: ServicePackage, as: 'servicePackages', include: [{ model: Package, as: 'package' }] }],
      attributes: ['plateNumber', 'carType'],
    });

    const servicePackagesByPackage = await Package.findAll({
      attributes: ['packageNumber', 'packageName'],
      include: [{ model: ServicePackage, as: 'servicePackages' }],
    });

    res.json({
      summary: { carCount, servicePackageCount, packageCount },
      servicePackagesByCar,
      servicePackagesByPackage: servicePackagesByPackage.map(pkg => ({
        packageNumber: pkg.packageNumber,
        packageName: pkg.packageName,
        count: pkg.servicePackages.length,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
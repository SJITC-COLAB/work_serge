// // routes/package.routes.js
// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const Package = db.Package;

// // Get all packages
// router.get('/', async (req, res) => {
//   try {
//     const packages = await Package.findAll();
//     res.json(packages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get package by packageNumber
// router.get('/:packageNumber', async (req, res) => {
//   try {
//     const package = await Package.findByPk(req.params.packageNumber);
    
//     if (!package) {
//       return res.status(404).json({ message: 'Package not found' });
//     }
    
//     res.json(package);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new package
// router.post('/', async (req, res) => {
//   try {
//     const package = await Package.create(req.body);
//     res.status(201).json(package);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a package
// router.put('/:packageNumber', async (req, res) => {
//   try {
//     const updated = await Package.update(req.body, {
//       where: { packageNumber: req.params.packageNumber }
//     });
    
//     if (updated[0] === 0) {
//       return res.status(404).json({ message: 'Package not found' });
//     }
    
//     const updatedPackage = await Package.findByPk(req.params.packageNumber);
//     res.json(updatedPackage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a package
// router.delete('/:packageNumber', async (req, res) => {
//   try {
//     const deleted = await Package.destroy({
//       where: { packageNumber: req.params.packageNumber }
//     });
    
//     if (deleted === 0) {
//       return res.status(404).json({ message: 'Package not found' });
//     }
    
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

// // routes/car.routes.js
// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const Car = db.Car;

// // Get all cars
// router.get('/', async (req, res) => {
//   try {
//     const cars = await Car.findAll();
//     res.json(cars);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get car by plateNumber
// router.get('/:plateNumber', async (req, res) => {
//   try {
//     const car = await Car.findByPk(req.params.plateNumber);
    
//     if (!car) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
    
//     res.json(car);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new car
// router.post('/', async (req, res) => {
//   try {
//     const car = await Car.create(req.body);
//     res.status(201).json(car);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a car
// router.put('/:plateNumber', async (req, res) => {
//   try {
//     const updated = await Car.update(req.body, {
//       where: { plateNumber: req.params.plateNumber }
//     });
    
//     if (updated[0] === 0) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
    
//     const updatedCar = await Car.findByPk(req.params.plateNumber);
//     res.json(updatedCar);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a car
// router.delete('/:plateNumber', async (req, res) => {
//   try {
//     const deleted = await Car.destroy({
//       where: { plateNumber: req.params.plateNumber }
//     });
    
//     if (deleted === 0) {
//       return res.status(404).json({ message: 'Car not found' });
//     }
    
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

// // routes/servicePackage.routes.js
// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const ServicePackage = db.ServicePackage;
// const Car = db.Car;
// const Package = db.Package;

// // Get all service packages
// router.get('/', async (req, res) => {
//   try {
//     const servicePackages = await ServicePackage.findAll({
//       include: [
//         { model: Car, as: 'car' },
//         { model: Package, as: 'package' }
//       ]
//     });
//     res.json(servicePackages);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Get service package by RecordNumber
// router.get('/:RecordNumber', async (req, res) => {
//   try {
//     const servicePackage = await ServicePackage.findByPk(req.params.RecordNumber, {
//       include: [
//         { model: Car, as: 'car' },
//         { model: Package, as: 'package' },
//         { model: db.Payment, as: 'payment' }
//       ]
//     });
    
//     if (!servicePackage) {
//       return res.status(404).json({ message: 'Service package not found' });
//     }
    
//     res.json(servicePackage);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Create a new service package
// router.post('/', async (req, res) => {
//   try {
//     // Verify car exists
//     const car = await Car.findByPk(req.body.plateNumber);
//     if (!car) {
//       return res.status(400).json({ message: 'Car not found' });
//     }

//     // Verify package exists
//     const package = await Package.findByPk(req.body.packageNumber);
//     if (!package) {
//       return res.status(400).json({ message: 'Package not found' });
//     }

//     const servicePackage = await ServicePackage.create(req.body);
//     res.status(201).json(servicePackage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Update a service package
// router.put('/:RecordNumber', async (req, res) => {
//   try {
//     const updated = await ServicePackage.update(req.body, {
//       where: { RecordNumber: req.params.RecordNumber }
//     });
    
//     if (updated[0] === 0) {
//       return res.status(404).json({ message: 'Service package not found' });
//     }
    
//     const updatedServicePackage = await ServicePackage.findByPk(req.params.RecordNumber);
//     res.json(updatedServicePackage);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Delete a service package
// router.delete('/:RecordNumber', async (req, res) => {
//   try {
//     const deleted = await ServicePackage.destroy({
//       where: { RecordNumber: req.params.RecordNumber }
//     });
    
//     if (deleted === 0) {
//       return res.status(404).json({ message: 'Service package not found' });
//     }
    
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;














// // // routes/payment.routes.js
// // const express = require('express');
// // const router = express.Router();
// // const db = require('../models');
// // const Payment = db.Payment;
// // const ServicePackage = db.ServicePackage;

// // // Get all payments
// // router.get('/', async (req, res) => {
// //   try {
// //     const payments = await Payment.findAll({
// //       include: [{ model: ServicePackage, as: 'servicePackage' }]
// //     });
// //     res.json(payments);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Get payment by paymentNumber
// // router.get('/:paymentNumber', async (req, res) => {
// //   try {
// //     const payment = await Payment.findByPk(req.params.paymentNumber, {
// //       include: [{ model: ServicePackage, as: 'servicePackage' }]
// //     });
    
// //     if (!payment) {
// //       return res.status(404).json({ message: 'Payment not found' });
// //     }
    
// //     res.json(payment);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // // Create a new payment
// // router.post('/', async (req, res) => {
// //   try {
// //     // Verify service package exists
// //     const servicePackage = await ServicePackage.findByPk(req.body.RecordNumber);
// //     if (!servicePackage) {
// //       return res.status(400).json({ message: 'Service package not found' });
// //     }

// //     // Check if payment already exists for this service package
// //     const existingPayment = await Payment.findOne({
// //       where: { RecordNumber: req.body.RecordNumber }
// //     });
    
// //     if (existingPayment) {
// //       return res.status(400).json({ 
// //         message: 'A payment already exists for this service package' 
// //       });
// //     }

// //     const payment = await Payment.create(req.body);
// //     res.status(201).json(payment);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Update a payment
// // router.put('/:paymentNumber', async (req, res) => {
// //   try {
// //     const updated = await Payment.update(req.body, {
// //       where: { paymentNumber: req.params.paymentNumber }
// //     });
    
// //     if (updated[0] === 0) {
// //       return res.status(404).json({ message: 'Payment not found' });
// //     }
    
// //     const updatedPayment = await Payment.findByPk(req.params.paymentNumber);
// //     res.json(updatedPayment);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // });

// // // Delete a payment
// // router.delete('/:paymentNumber', async (req, res) => {
// //   try {
// //     const deleted = await Payment.destroy({
// //       where: { paymentNumber: req.params.paymentNumber }
// //     });
    
// //     if (deleted === 0) {
// //       return res.status(404).json({ message: 'Payment not found' });
// //     }
    
// //     res.status(204).send();
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // module.exports = router;
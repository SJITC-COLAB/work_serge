// routes/servicePackage.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const { generateRandomId } = require('../utils/Utils');
const ServicePackage = db.ServicePackage;
const Car = db.Car;
const Package = db.Package;

// Get all service packages
router.get('/', async (req, res) => {
  try {
    const servicePackages = await ServicePackage.findAll({
      include: [
        { model: Car, as: 'car' },
        { model: Package, as: 'package' }
      ]
    });
    res.json(servicePackages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get service package by RecordNumber
router.get('/:RecordNumber', async (req, res) => {
  try {
    const servicePackage = await ServicePackage.findByPk(req.params.RecordNumber, {
      include: [
        { model: Car, as: 'car' },
        { model: Package, as: 'package' },
        { model: db.Payment, as: 'payment' }
      ]
    });
    
    if (!servicePackage) {
      return res.status(404).json({ message: 'Service package not found' });
    }
    
    res.json(servicePackage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new service package
router.post('/', async (req, res) => {
  try {
    // Verify car exists
    const car = await Car.findByPk(req.body.plateNumber);
    if (!car) {
      return res.status(400).json({ message: 'Car not found' });
    }

    // Verify package exists
    const package = await Package.findByPk(req.body.packageNumber);
    if (!package) {
      return res.status(400).json({ message: 'Package not found' });
    }

    const id = generateRandomId(5)

    req.body['RecordNumber'] = `SVC${id}`;



    const servicePackage = await ServicePackage.create(req.body);
    res.status(201).json(servicePackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a service package
router.put('/:RecordNumber', async (req, res) => {
  try {

    
    const updated = await ServicePackage.update(req.body, {
      where: { RecordNumber: req.params.RecordNumber }
    });
    
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Service package not found' });
    }
    
    const updatedServicePackage = await ServicePackage.findByPk(req.params.RecordNumber);
    res.json(updatedServicePackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a service package
router.delete('/:RecordNumber', async (req, res) => {
  try {
    const deleted = await ServicePackage.destroy({
      where: { RecordNumber: req.params.RecordNumber }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Service package not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

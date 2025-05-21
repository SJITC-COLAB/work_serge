// routes/package.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Package = db.Package;

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.findAll();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get package by packageNumber
router.get('/:packageNumber', async (req, res) => {
  try {
    const package = await Package.findByPk(req.params.packageNumber);
    
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(package);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new package
router.post('/', async (req, res) => {
  try {
    const package = await Package.create(req.body);
    res.status(201).json(package);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a package
router.put('/:packageNumber', async (req, res) => {
  try {
    const updated = await Package.update(req.body, {
      where: { packageNumber: req.params.packageNumber }
    });
    
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    const updatedPackage = await Package.findByPk(req.params.packageNumber);
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a package
router.delete('/:packageNumber', async (req, res) => {
  try {
    const deleted = await Package.destroy({
      where: { packageNumber: req.params.packageNumber }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
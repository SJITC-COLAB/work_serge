// routes/car.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const { generateRandomId } = require('../utils/Utils');
const Car = db.Car;

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get car by plateNumber
router.get('/:plateNumber', async (req, res) => {
  try {
    const car = await Car.findByPk(req.params.plateNumber);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }



    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new car
router.post('/', async (req, res) => {
  try {
    const id = generateRandomId(6)
    req.body['plateNumber'] = `RWF${id}`;
    const carexist = await Car.findOne({ where: { plateNumber: req.body.plateNumber } })
    if (carexist) {
      return res.status(400).json({ message: 'car already exit' })
    }

    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a car
router.put('/:plateNumber', async (req, res) => {
  try {
    const updated = await Car.update(req.body, {
      where: { plateNumber: req.params.plateNumber }
    });

    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updatedCar = await Car.findByPk(req.params.plateNumber);
    res.json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a car
router.delete('/:plateNumber', async (req, res) => {
  try {
    const deleted = await Car.destroy({
      where: { plateNumber: req.params.plateNumber }
    });

    if (deleted === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
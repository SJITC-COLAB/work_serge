// routes/payment.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const Payment = db.Payment;
const ServicePackage = db.ServicePackage;

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: ServicePackage, as: 'servicePackage' }]
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment by paymentNumber
router.get('/:paymentNumber', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.paymentNumber, {
      include: [{ model: ServicePackage, as: 'servicePackage' }]
    });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  try {
    // Verify service package exists
    const servicePackage = await ServicePackage.findByPk(req.body.RecordNumber);
    if (!servicePackage) {
      return res.status(400).json({ message: 'Service package not found' });
    }

    // Check if payment already exists for this service package
    const existingPayment = await Payment.findOne({
      where: { RecordNumber: req.body.RecordNumber }
    });
    
    if (existingPayment) {
      return res.status(400).json({ 
        message: 'A payment already exists for this service package' 
      });
    }

    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a payment
router.put('/:paymentNumber', async (req, res) => {
  try {
    const updated = await Payment.update(req.body, {
      where: { paymentNumber: req.params.paymentNumber }
    });
    
    if (updated[0] === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    const updatedPayment = await Payment.findByPk(req.params.paymentNumber);
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a payment
router.delete('/:paymentNumber', async (req, res) => {
  try {
    const deleted = await Payment.destroy({
      where: { paymentNumber: req.params.paymentNumber }
    });
    
    if (deleted === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
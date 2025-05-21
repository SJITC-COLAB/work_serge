// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const packageRoutes = require('./routes/package.routes');
const carRoutes = require('./routes/car.routes');
const servicePackageRoutes = require('./routes/servicePackage.routes');
const paymentRoutes = require('./routes/payment.routes');
const authRoutes = require('./routes/auth.routes');

// app.js
app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/service-packages', servicePackageRoutes);
app.use('/api/payments', paymentRoutes);

// Simple route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Car Service API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });

module.exports = app;
# Car Service Management System - Installation Guide

This guide will help you set up the Car Service Management System using Express.js, Sequelize, and MySQL2.

## Prerequisites

- Node.js (v14.x or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Step 1: Set Up the Project

```bash
# Create a new project directory
mkdir car-service-system
cd car-service-system

# Initialize a new Node.js project
npm init -y

# Install required dependencies
npm install express sequelize mysql2 dotenv cors body-parser
npm install --save-dev nodemon
```

## Step 2: Create Project Structure

Create the following directory structure:

```
car-service-system/
├── models/
│   ├── index.js
│   ├── package.js
│   ├── car.js
│   ├── servicePackage.js
│   └── payment.js
├── routes/
│   ├── package.routes.js
│   ├── car.routes.js
│   ├── servicePackage.routes.js
│   └── payment.routes.js
├── app.js
├── .env
└── package.json
```

## Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add your database configuration:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=car_service_db
DB_PORT=3306
```

Make sure to replace `your_password` with your actual MySQL password.

## Step 4: Create the Database

Connect to MySQL and create the database:

```sql
CREATE DATABASE car_service_db;
```

## Step 5: Copy the Model and Route Files

Copy the content of the provided model files into the corresponding files in your project's `models` directory, and do the same for the route files in the `routes` directory.

## Step 6: Update package.json

Add the following scripts to your `package.json`:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

## Step 7: Run the Application

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The server will start on port 3000 (or the port specified in your `.env` file).

## API Endpoints

### Package Endpoints
- `GET /api/packages` - Get all packages
- `GET /api/packages/:packageNumber` - Get package by ID
- `POST /api/packages` - Create a new package
- `PUT /api/packages/:packageNumber` - Update a package
- `DELETE /api/packages/:packageNumber` - Delete a package

### Car Endpoints
- `GET /api/cars` - Get all cars
- `GET /api/cars/:plateNumber` - Get car by plate number
- `POST /api/cars` - Register a new car
- `PUT /api/cars/:plateNumber` - Update car information
- `DELETE /api/cars/:plateNumber` - Delete a car

### Service Package Endpoints
- `GET /api/service-packages` - Get all service records
- `GET /api/service-packages/:RecordNumber` - Get service by record number
- `POST /api/service-packages` - Create a new service record
- `PUT /api/service-packages/:RecordNumber` - Update a service record
- `DELETE /api/service-packages/:RecordNumber` - Delete a service record

### Payment Endpoints
- `GET /api/payments` - Get all payments
- `GET /api/payments/:paymentNumber` - Get payment by number
- `POST /api/payments` - Record a new payment
- `PUT /api/payments/:paymentNumber` - Update payment information
- `DELETE /api/payments/:paymentNumber` - Delete a payment record

## Data Models

### Package
```json
{
  "packageNumber": "PKG001",
  "packageName": "Basic Wash",
  "packageDescription": "Exterior washing and basic cleaning",
  "packagePrice": 25.99
}
```

### Car
```json
{
  "plateNumber": "ABC123",
  "carType": "Sedan",
  "carSize": "Medium",
  "driverName": "John Doe",
  "phoneNumber": "555-123-4567"
}
```

### Service Package
```json
{
  "RecordNumber": "SVC001",
  "serviceDate": "2025-05-21T10:00:00.000Z",
  "plateNumber": "ABC123",
  "packageNumber": "PKG001"
}
```

### Payment
```json
{
  "paymentNumber": "PAY001",
  "amountPaid": 25.99,
  "PaymentDate": "2025-05-21T10:30:00.000Z",
  "RecordNumber": "SVC001"
}
```
// src/services/carService.js
import axiosInstance from '../api/axiosInstance';

const carService = {
  // Get all cars
  getAllCars: async () => {
    try {
      const response = await axiosInstance.get('/api/cars');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get car by plateNumber
  getCarByPlateNumber: async (plateNumber) => {
    try {
      const response = await axiosInstance.get(`/api/cars/${plateNumber}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Create a new car
  createCar: async (carData) => {
    try {
      const response = await axiosInstance.post('/api/cars', carData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Update a car
  updateCar: async (plateNumber, carData) => {
    try {
      const response = await axiosInstance.put(`/api/cars/${plateNumber}`, carData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Delete a car
  deleteCar: async (plateNumber) => {
    try {
      await axiosInstance.delete(`/api/cars/${plateNumber}`);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default carService;
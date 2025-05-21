// src/services/packageService.js
import axiosInstance from '../api/axiosInstance';

const packageService = {
  // Get all packages
  getAllPackages: async () => {
    try {
      const response = await axiosInstance.get('/api/packages');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get package by packageNumber
  getPackageByPackageNumber: async (packageNumber) => {
    try {
      const response = await axiosInstance.get(`/api/packages/${packageNumber}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Create a new package
  createPackage: async (packageData) => {
    try {
      const response = await axiosInstance.post('/api/packages', packageData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Update a package
  updatePackage: async (packageNumber, packageData) => {
    try {
      const response = await axiosInstance.put(`/api/packages/${packageNumber}`, packageData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Delete a package
  deletePackage: async (packageNumber) => {
    try {
      await axiosInstance.delete(`/api/packages/${packageNumber}`);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default packageService;
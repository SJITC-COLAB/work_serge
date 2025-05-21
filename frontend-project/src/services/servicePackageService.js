// src/services/servicePackageService.js
import axiosInstance from '../api/axiosInstance';

const servicePackageService = {
  // Get all service packages
  getAllServicePackages: async () => {
    try {
      const response = await axiosInstance.get('/api/service-packages');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get service package by RecordNumber
  getServicePackageByRecordNumber: async (recordNumber) => {
    try {
      const response = await axiosInstance.get(`/api/service-packages/${recordNumber}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Create a new service package
  createServicePackage: async (servicePackageData) => {
    try {
      const response = await axiosInstance.post('/api/service-packages', servicePackageData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Update a service package
  updateServicePackage: async (recordNumber, servicePackageData) => {
    try {
      const response = await axiosInstance.put(`/api/service-packages/${recordNumber}`, servicePackageData);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Delete a service package
  deleteServicePackage: async (recordNumber) => {
    try {
      await axiosInstance.delete(`/api/service-packages/${recordNumber}`);
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Fetch cars for dropdown
  getCarsForDropdown: async () => {
    try {
      const response = await axiosInstance.get('/api/cars');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Fetch packages for dropdown
  getPackagesForDropdown: async () => {
    try {
      const response = await axiosInstance.get('/api/packages');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default servicePackageService;
// src/services/reportService.js
import axiosInstance from '../api/axiosInstance';

const reportService = {
  getSummaryReport: async () => {
    try {
      const response = await axiosInstance.get('/api/reports/summary');
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default reportService;
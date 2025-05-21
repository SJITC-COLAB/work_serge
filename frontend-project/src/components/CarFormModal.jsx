// src/components/CarFormModal.js
import { useState, useEffect } from 'react';
import carService from '../services/carService';

const CarFormModal = ({ plateNumber, isEdit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    carType: '',
    carSize: '',
    driverName: '',
    phoneNumber: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isEdit && plateNumber) {
      const fetchCar = async () => {
        try {
          const data = await carService.getCarByPlateNumber(plateNumber);
          setFormData({
            plateNumber: data.plateNumber,
            carType: data.carType,
            carSize: data.carSize,
            driverName: data.driverName,
            phoneNumber: data.phoneNumber,
          });
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchCar();
    }
  }, [isEdit, plateNumber]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEdit) {
        response = await carService.updateCar(plateNumber, formData);
      } else {
        response = await carService.createCar(formData);
      }
      setSuccess(isEdit ? 'Car updated successfully' : 'Car created successfully');
      setError(null);
      onSuccess(response);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">{success}</div>}
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Car' : 'Create Car'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Plate Number</label>
            <input
              type="text"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
              disabled={isEdit} // Prevent changing plateNumber on edit
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Car Type</label>
            <input
              type="text"
              name="carType"
              value={formData.carType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Car Size</label>
            <input
              type="text"
              name="carSize"
              value={formData.carSize}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              {isEdit ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarFormModal;
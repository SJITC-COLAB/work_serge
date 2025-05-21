// src/components/ServicePackageFormModal.js
import { useState, useEffect } from 'react';
import servicePackageService from '../services/servicePackageService';

const ServicePackageFormModal = ({ recordNumber, isEdit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    packageNumber: '',
    serviceDate: '',
  });
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsData, packagesData] = await Promise.all([
          servicePackageService.getCarsForDropdown(),
          servicePackageService.getPackagesForDropdown(),
        ]);
        setCars(carsData);
        setPackages(packagesData);

        if (isEdit && recordNumber) {
          const data = await servicePackageService.getServicePackageByRecordNumber(recordNumber);
          setFormData({
            plateNumber: data.plateNumber,
            packageNumber: data.packageNumber,
            serviceDate: data.serviceDate.split('T')[0],
          });
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [isEdit, recordNumber]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEdit) {
        response = await servicePackageService.updateServicePackage(recordNumber, formData);
      } else {
        response = await servicePackageService.createServicePackage(formData);
      }
      setSuccess(isEdit ? 'Service package updated successfully' : 'Service package created successfully');
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
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Service Package' : 'Create Service Package'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Car</label>
            <select
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select a car</option>
              {cars.map((car) => (
                <option key={car.plateNumber} value={car.plateNumber}>
                  {car.carType} ({car.plateNumber})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Package</label>
            <select
              name="packageNumber"
              value={formData.packageNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Select a package</option>
              {packages.map((pkg) => (
                <option key={pkg.packageNumber} value={pkg.packageNumber}>
                  {pkg.packageName} ({pkg.packageNumber})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Service Date</label>
            <input
              type="date"
              name="serviceDate"
              value={formData.serviceDate}
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

export default ServicePackageFormModal;
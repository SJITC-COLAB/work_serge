// src/components/PackageFormModal.js
import { useState, useEffect } from 'react';
import packageService from '../services/packageService';

const PackageFormModal = ({ packageNumber, isEdit, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    packageNumber: '',
    packageName: '',
    packageDescription: '',
    packagePrice: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (isEdit && packageNumber) {
      const fetchPackage = async () => {
        try {
          const data = await packageService.getPackageByPackageNumber(packageNumber);
          setFormData({
            packageNumber: data.packageNumber,
            packageName: data.packageName,
            packageDescription: data.packageDescription,
            packagePrice: data.packagePrice,
          });
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchPackage();
    }
  }, [isEdit, packageNumber]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isEdit) {
        response = await packageService.updatePackage(packageNumber, formData);
      } else {
        response = await packageService.createPackage(formData);
      }
      setSuccess(isEdit ? 'Package updated successfully' : 'Package created successfully');
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
        <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Edit Package' : 'Create Package'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Package Number</label>
            <input
              type="text"
              name="packageNumber"
              value={formData.packageNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
              disabled={isEdit} // Prevent changing packageNumber on edit
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Package Name</label>
            <input
              type="text"
              name="packageName"
              value={formData.packageName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="packageDescription"
              value={formData.packageDescription}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="packagePrice"
              value={formData.packagePrice}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
              step="0.01"
              min="0"
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

export default PackageFormModal;
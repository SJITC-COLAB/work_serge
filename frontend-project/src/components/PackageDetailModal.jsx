// src/components/PackageDetailModal.js
import { useEffect, useState } from 'react';
import packageService from '../services/packageService';

const PackageDetailModal = ({ packageNumber, onClose }) => {
  const [pkg, setPkg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const data = await packageService.getPackageByPackageNumber(packageNumber);
        setPkg(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPackage();
  }, [packageNumber]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        {pkg ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Package Details</h2>
            <p><strong>Package Number:</strong> {pkg.packageNumber}</p>
            <p><strong>Package Name:</strong> {pkg.packageName}</p>
            <p><strong>Description:</strong> {pkg.packageDescription}</p>
            <p><strong>Price:</strong> ${pkg.packagePrice}</p>
            <button
              onClick={onClose}
              className="mt-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PackageDetailModal;
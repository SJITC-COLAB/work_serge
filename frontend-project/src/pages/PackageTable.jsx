// src/components/PackageTable.js
import { useState, useEffect } from 'react';
import packageService from '../services/packageService';
import PackageDetailModal from '../components/PackageDetailModal';
import PackageFormModal from '../components/PackageFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const PackageTable = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPackageNumber, setSelectedPackageNumber] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageService.getAllPackages();
        setPackages(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPackages();
  }, []);

  const handleDelete = async () => {
    try {
      await packageService.deletePackage(selectedPackageNumber);
      setPackages(packages.filter(pkg => pkg.packageNumber !== selectedPackageNumber));
      setSuccess('Package deleted successfully');
      setError(null);
      setShowDeleteModal(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.message);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">{success}</div>}
      <button
        onClick={() => { setIsEdit(false); setShowFormModal(true); }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Add New Package
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Package Number</th>
              <th className="py-2 px-4 border-b">Package Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.packageNumber} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{pkg.packageNumber}</td>
                <td className="py-2 px-4 border-b">{pkg.packageName}</td>
                <td className="py-2 px-4 border-b">{pkg.packageDescription}</td>
                <td className="py-2 px-4 border-b">${pkg.packagePrice}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => { setSelectedPackageNumber(pkg.packageNumber); setShowDetailModal(true); }}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => { setSelectedPackageNumber(pkg.packageNumber); setIsEdit(true); setShowFormModal(true); }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedPackageNumber(pkg.packageNumber); setShowDeleteModal(true); }}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetailModal && (
        <PackageDetailModal
          packageNumber={selectedPackageNumber}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showFormModal && (
        <PackageFormModal
          packageNumber={isEdit ? selectedPackageNumber : null}
          isEdit={isEdit}
          onClose={() => setShowFormModal(false)}
          onSuccess={(updatedPackage) => {
            if (isEdit) {
              setPackages(packages.map(pkg => pkg.packageNumber === updatedPackage.packageNumber ? updatedPackage : pkg));
            } else {
              setPackages([...packages, updatedPackage]);
            }
            setSuccess(isEdit ? 'Package updated successfully' : 'Package created successfully');
            setTimeout(() => setSuccess(null), 3000);
            setShowFormModal(false);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default PackageTable;
// src/components/ServicePackageTable.js
import { useState, useEffect } from 'react';
import servicePackageService from '../services/servicePackageService';
import ServicePackageDetailModal from '../components/ServicePackageDetailModal';
import ServicePackageFormModal from '../components/ServicePackageFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const ServicePackageTable = () => {
  const [servicePackages, setServicePackages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecordNumber, setSelectedRecordNumber] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchServicePackages = async () => {
      try {
        const data = await servicePackageService.getAllServicePackages();
        setServicePackages(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchServicePackages();
  }, []);

  const handleDelete = async () => {
    try {
      await servicePackageService.deleteServicePackage(selectedRecordNumber);
      setServicePackages(servicePackages.filter(sp => sp.RecordNumber !== selectedRecordNumber));
      setSuccess('Service package deleted successfully');
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
        Add New Service Package
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Record Number</th>
              <th className="py-2 px-4 border-b">Car</th>
              <th className="py-2 px-4 border-b">Package</th>
              <th className="py-2 px-4 border-b">Service Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicePackages.map((sp) => (
              <tr key={sp.RecordNumber} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{sp.RecordNumber}</td>
                <td className="py-2 px-4 border-b">{sp.car?.carType} ({sp.plateNumber})</td>
                <td className="py-2 px-4 border-b">{sp.package?.packageName} ({sp.packageNumber})</td>
                <td className="py-2 px-4 border-b">{new Date(sp.serviceDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => { setSelectedRecordNumber(sp.RecordNumber); setShowDetailModal(true); }}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => { setSelectedRecordNumber(sp.RecordNumber); setIsEdit(true); setShowFormModal(true); }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedRecordNumber(sp.RecordNumber); setShowDeleteModal(true); }}
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
        <ServicePackageDetailModal
          recordNumber={selectedRecordNumber}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showFormModal && (
        <ServicePackageFormModal
          recordNumber={isEdit ? selectedRecordNumber : null}
          isEdit={isEdit}
          onClose={() => setShowFormModal(false)}
          onSuccess={(updatedPackage) => {
            if (isEdit) {
              setServicePackages(servicePackages.map(sp => sp.RecordNumber === updatedPackage.RecordNumber ? updatedPackage : sp));
            } else {
              setServicePackages([...servicePackages, updatedPackage]);
            }
            setSuccess(isEdit ? 'Service package updated successfully' : 'Service package created successfully');
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

export default ServicePackageTable;
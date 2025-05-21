// src/components/ServicePackageDetailModal.js
import { useEffect, useState } from 'react';
import servicePackageService from '../services/servicePackageService';

const ServicePackageDetailModal = ({ recordNumber, onClose }) => {
  const [servicePackage, setServicePackage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicePackage = async () => {
      try {
        const data = await servicePackageService.getServicePackageByRecordNumber(recordNumber);
        setServicePackage(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchServicePackage();
  }, [recordNumber]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        {servicePackage ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Service Package Details</h2>
            <p><strong>Record Number:</strong> {servicePackage.RecordNumber}</p>
            <p><strong>Car:</strong> {servicePackage.car?.carType} ({servicePackage.plateNumber})</p>
            <p><strong>Package:</strong> {servicePackage.package?.packageName} ({servicePackage.packageNumber})</p>
            <p><strong>Service Date:</strong> {new Date(servicePackage.serviceDate).toLocaleDateString()}</p>
            {servicePackage.payment && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Payment Details</h3>
                <p><strong>Payment Number:</strong> {servicePackage.payment.paymentNumber}</p>
                <p><strong>Amount:</strong> ${servicePackage.payment.amountPaid}</p>
                <p><strong>Payment Date:</strong> {new Date(servicePackage.payment.PaymentDate).toLocaleDateString()}</p>
              </div>
            )}
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

export default ServicePackageDetailModal;
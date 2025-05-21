// src/components/CarDetailModal.js
import { useEffect, useState } from 'react';
import carService from '../services/carService';

const CarDetailModal = ({ plateNumber, onClose }) => {
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await carService.getCarByPlateNumber(plateNumber);
        setCar(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCar();
  }, [plateNumber]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
        {car ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Car Details</h2>
            <p><strong>Plate Number:</strong> {car.plateNumber}</p>
            <p><strong>Car Type:</strong> {car.carType}</p>
            <p><strong>Car Size:</strong> {car.carSize}</p>
            <p><strong>Driver Name:</strong> {car.driverName}</p>
            <p><strong>Phone Number:</strong> {car.phoneNumber}</p>
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

export default CarDetailModal;
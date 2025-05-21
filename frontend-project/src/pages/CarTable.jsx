// src/components/CarTable.js
import { useState, useEffect } from 'react';
import carService from '../services/carService';
import CarDetailModal from '../components/CarDetailModal';
import CarFormModal from '../components/CarFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

const CarTable = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlateNumber, setSelectedPlateNumber] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await carService.getAllCars();
        setCars(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async () => {
    try {
      await carService.deleteCar(selectedPlateNumber);
      setCars(cars.filter(car => car.plateNumber !== selectedPlateNumber));
      setSuccess('Car deleted successfully');
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add New Car
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Plate Number</th>
              <th className="py-2 px-4 border-b">Car Type</th>
              <th className="py-2 px-4 border-b">Car Size</th>
              <th className="py-2 px-4 border-b">Driver Name</th>
              <th className="py-2 px-4 border-b">Phone Number</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.plateNumber} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{car.plateNumber}</td>
                <td className="py-2 px-4 border-b">{car.carType}</td>
                <td className="py-2 px-4 border-b">{car.carSize}</td>
                <td className="py-2 px-4 border-b">{car.driverName}</td>
                <td className="py-2 px-4 border-b">{car.phoneNumber}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => { setSelectedPlateNumber(car.plateNumber); setShowDetailModal(true); }}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => { setSelectedPlateNumber(car.plateNumber); setIsEdit(true); setShowFormModal(true); }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedPlateNumber(car.plateNumber); setShowDeleteModal(true); }}
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
        <CarDetailModal
          plateNumber={selectedPlateNumber}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showFormModal && (
        <CarFormModal
          plateNumber={isEdit ? selectedPlateNumber : null}
          isEdit={isEdit}
          onClose={() => setShowFormModal(false)}
          onSuccess={(updatedCar) => {
            if (isEdit) {
              setCars(cars.map(car => car.plateNumber === updatedCar.plateNumber ? updatedCar : car));
            } else {
              setCars([...cars, updatedCar]);
            }
            setSuccess(isEdit ? 'Car updated successfully' : 'Car created successfully');
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

export default CarTable;
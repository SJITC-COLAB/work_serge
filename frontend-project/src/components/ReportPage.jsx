// src/components/ReportPage.js
import { useState, useEffect } from 'react';
import carService from '../services/carService';
import servicePackageService from '../services/servicePackageService';
import packageService from '../services/packageService';

const ReportPage = () => {
  const [cars, setCars] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsData, servicePackagesData, packagesData] = await Promise.all([
          carService.getAllCars(),
          servicePackageService.getAllServicePackages(),
          packageService.getAllPackages(),
        ]);
        setCars(carsData);
        setServicePackages(servicePackagesData);
        setPackages(packagesData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Aggregate data for Service Packages by Car
  const servicePackagesByCar = cars.map(car => ({
    plateNumber: car.plateNumber,
    carType: car.carType,
    servicePackages: servicePackages.filter(sp => sp.plateNumber === car.plateNumber),
  }));

  // Aggregate data for Service Packages by Package Type
  const servicePackagesByPackage = packages.map(pkg => ({
    packageNumber: pkg.packageNumber,
    packageName: pkg.packageName,
    count: servicePackages.filter(sp => sp.packageNumber === pkg.packageNumber).length,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">System Report</h2>
      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {loading ? (
        <p className="text-center">Loading report...</p>
      ) : (
        <>
          {/* Summary Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-medium">Total Cars</h4>
                <p className="text-2xl font-bold">{cars.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-medium">Total Service Packages</h4>
                <p className="text-2xl font-bold">{servicePackages.length}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h4 className="text-lg font-medium">Total Packages</h4>
                <p className="text-2xl font-bold">{packages.length}</p>
              </div>
            </div>
          </div>

          {/* Service Packages by Car */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Service Packages by Car</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-blue-300">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="py-2 px-4 border-b">Plate Number</th>
                    <th className="py-2 px-4 border-b">Car Type</th>
                    <th className="py-2 px-4 border-b">Service Packages</th>
                    <th className="py-2 px-4 border-b">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePackagesByCar.map((car) => (
                    <tr key={car.plateNumber} className="hover:bg-blue-50">
                      <td className="py-2 px-4 border-b">{car.plateNumber}</td>
                      <td className="py-2 px-4 border-b">{car.carType}</td>
                      <td className="py-2 px-4 border-b">{car.servicePackages.length}</td>
                      <td className="py-2 px-4 border-b">
                        {car.servicePackages.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {car.servicePackages.map((sp) => (
                              <li key={sp.RecordNumber}>
                                {sp.package?.packageName} on {new Date(sp.serviceDate).toLocaleDateString()}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          'None'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Service Packages by Package Type */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Service Packages by Package Type</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-blue-300">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="py-2 px-4 border-b">Package Number</th>
                    <th className="py-2 px-4 border-b">Package Name</th>
                    <th className="py-2 px-4 border-b">Service Package Count</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePackagesByPackage.map((pkg) => (
                    <tr key={pkg.packageNumber} className="hover:bg-blue-50">
                      <td className="py-2 px-4 border-b">{pkg.packageNumber}</td>
                      <td className="py-2 px-4 border-b">{pkg.packageName}</td>
                      <td className="py-2 px-4 border-b">{pkg.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPage;
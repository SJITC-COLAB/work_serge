// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CarTable from './pages/CarTable';
import ServicePackageTable from './pages/ServicePackageTable';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Car Service Management System</h1>
          <Routes>
            <Route path="/cars" element={<CarTable />} />
            <Route path="/service-packages" element={<ServicePackageTable />} />
            <Route path="*" element={<Navigate to={'/cars'} />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
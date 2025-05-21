// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CarTable from './pages/CarTable';
import ServicePackageTable from './pages/ServicePackageTable';
import PackageTable from './pages/PackageTable';
import authService from './services/authService';

const ProtectedRoute = ({ children }) => {
  const user = authService.getCurrentUser();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex  bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/cars"
              element={
                <ProtectedRoute>
                  <CarTable />
                </ProtectedRoute>
              }
            />
          
            <Route path="/" element={<Navigate to="/cars" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
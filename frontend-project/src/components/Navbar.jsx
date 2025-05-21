// src/components/Navbar.js
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Car Service Management
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <Link
            to="/cars"
            className={`block px-3 py-2 rounded-md hover:bg-blue-700 ${
              location.pathname === '/cars' ? 'bg-blue-800' : ''
            }`}
          >
            Cars
          </Link>
          <Link
            to="/service-packages"
            className={`block px-3 py-2 rounded-md hover:bg-blue-700 ${
              location.pathname === '/service-packages' ? 'bg-blue-800' : ''
            }`}
          >
            Service Packages
          </Link>
          <Link
            to="/packages"
            className={`block px-3 py-2 rounded-md hover:bg-blue-700 ${
              location.pathname === '/packages' ? 'bg-blue-800' : ''
            }`}
          >
            Packages
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-600">
          <Link
            to="/cars"
            className={`block px-4 py-2 hover:bg-blue-700 ${
              location.pathname === '/cars' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu}
          >
            Cars
          </Link>
          <Link
            to="/service-packages"
            className={`block px-4 py-2 hover:bg-blue-700 ${
              location.pathname === '/service-packages' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu}
          >
            Service Packages
          </Link>
          <Link
            to="/packages"
            className={`block px-4 py-2 hover:bg-blue-700 ${
              location.pathname === '/packages' ? 'bg-blue-800' : ''
            }`}
            onClick={toggleMenu}
          >
            Packages
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
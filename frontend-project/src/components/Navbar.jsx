// src/components/Navbar.js
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if(!user) return null

  return (
    <nav className="bg-green-600 w-[240px] min-h-screen items-center flex flex-col justify-around text-white shadow-lg">
      <div className="container mx-auto px-4  flex-col  py-3 flex h-1/2 justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          CWSMS
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
        <div className={`md:flex hidden space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          {user ? (
            <>
              <Link
                to="/cars"
                className={`block px-3 py-2 rounded-md hover:bg-green-700 ${
                  location.pathname === '/cars' ? 'bg-green-800' : ''
                }`}
              >
                Cars
              </Link>
{/*              
              <button
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md hover:bg-red-700 bg-red-600"
              >
                Logout
              </button> */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md hover:bg-green-700 ${
                  location.pathname === '/login' ? 'bg-green-800' : ''
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block px-3 py-2 rounded-md hover:bg-green-700 ${
                  location.pathname === '/register' ? 'bg-green-800' : ''
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-green-600">
          {user ? (
            <>
              <Link
                to="/cars"
                className={`block px-4 py-2 hover:bg-green-700 ${
                  location.pathname === '/cars' ? 'bg-green-800' : ''
                }`}
                onClick={toggleMenu}
              >
                Cars
              </Link>
               
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-4 py-2 hover:bg-green-700 ${
                  location.pathname === '/login' ? 'bg-green-800' : ''
                }`}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`block px-4 py-2 hover:bg-green-700 ${
                  location.pathname === '/register' ? 'bg-green-800' : ''
                }`}
                onClick={toggleMenu}
              >
                Register
              </Link>
            </>
          )}
        </div>

      )}

                   <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className=" rounded-md text-left px-4 py-2 hover:bg-red-700 bg-red-600"
              >
                Logout
              </button>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import necessary icons
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './MANLITICS-LOGOn.webp';

const NavbarButton = ({ onClick, children }) => (
  <button 
    className="block w-full px-4 py-2 text-gray-700 hover:bg-blue-100 transition duration-300 focus:outline-none focus:bg-blue-100 focus:text-blue-800" 
    onClick={onClick}
  >
    {children}
  </button>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.36:5030/api/v1/logout', {}, { withCredentials: true });
      sessionStorage.removeItem('username'); // Clear username from session storage
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white text-gray-700 shadow-md">
      <div className="flex items-center">
        <Link to="/search">
          <img src={logo} alt="Company Logo" className="h-10 mr-4 cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center text-sm focus:outline-none hover:text-blue-500 transition duration-300" 
            onClick={toggleDropdown} 
            aria-expanded={dropdownOpen} 
            aria-label="User Menu"
          >
            <FaUserCircle className="h-8 w-6 mr-2" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
              <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

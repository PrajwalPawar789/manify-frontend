import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaBell, FaCog, FaStar } from 'react-icons/fa'; // Import icons
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './Manify-logo.png'

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
      await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true });
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white text-gray-700 shadow-md">
      <div className="flex items-center">
        <Link to="/search">
          <img src={logo} alt="Company Logo" className="h-8 mr-2 cursor-pointer"/>
        </Link>
        <span className="font-bold text-lg mr-4">B2B Data Provider</span>
        <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
          <input type="text" className="px-4 py-2 w-80" placeholder="Search..."/>
          <button className="flex items-center justify-center px-4 border-l bg-gray-200 hover:bg-gray-300 transition duration-300">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.707 20.293l-5.387-5.387A7.948 7.948 0 0018 10a8 8 0 10-8 8 7.948 7.948 0 005.906-2.68l5.387 5.387a.999.999 0 101.414-1.414zM10 16a6 6 0 110-12 6 6 0 010 12z"></path></svg>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-700 focus:outline-none relative">
          <FaBell className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="text-gray-700 focus:outline-none">
          <FaCog className="h-6 w-6" />
        </button>
        <button className="bg-blue-500 text-white rounded-full px-4 py-2 flex items-center font-bold hover:bg-blue-600 transition duration-300">
          <FaStar className="mr-2"/> Upgrade
        </button>
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
              <NavbarButton onClick={() => navigate('/profile')}>Profile</NavbarButton>
              <NavbarButton onClick={() => navigate('/dashboard')}>Dashboard</NavbarButton>
              <NavbarButton onClick={handleLogout}>Logout</NavbarButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-4">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;

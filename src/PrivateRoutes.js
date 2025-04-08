import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const username = sessionStorage.getItem('username');

    if (!username) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;

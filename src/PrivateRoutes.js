import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoutes = () => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                // Send a request to a protected endpoint to check authentication
                await axios.get('http://localhost:5000/api/v1/search', { withCredentials: true });
                // If request succeeds, the user is authenticated
                setAuthenticated(true);
            } catch (error) {
                // If request fails (e.g., token expired or not present), the user is not authenticated
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuthentication();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoutes;

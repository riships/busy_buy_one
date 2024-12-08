import React from 'react';
import { Navigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../context/Auth/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    // If the user is not authenticated, redirect to the SignIn page.
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;

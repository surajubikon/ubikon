// ./API/PrivateRoute.js

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");  // Check if the user is authenticated

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/admin" />;
    }

    return children; // Render the children if authenticated
};

export default PrivateRoute; // Ensure you are using default export

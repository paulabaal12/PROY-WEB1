import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, component: Component }) => {
  return isLoggedIn ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
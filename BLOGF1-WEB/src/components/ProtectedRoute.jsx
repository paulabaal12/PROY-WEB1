import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
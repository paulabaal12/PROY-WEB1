import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (isLoggedIn, component) => {
  if (isLoggedIn) {
    return component;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default withAuth;
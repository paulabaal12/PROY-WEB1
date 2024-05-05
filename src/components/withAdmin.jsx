import React from 'react';
import { Navigate } from 'react-router-dom';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

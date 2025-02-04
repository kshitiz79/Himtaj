import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if the user is logged in
  if (!user) {
    alert("You must be logged in!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user's role matches the required role
  if (requiredRole && user.role !== requiredRole) {
    alert("Access denied! You do not have permission to view this page.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;

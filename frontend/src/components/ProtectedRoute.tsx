import React from 'react';
import { Navigate } from 'react-router-dom';
import { getPermissions } from '../providers/options/login';

const ProtectedRoute = ({ children, roles }: { children: JSX.Element, roles?: string[] }) => {
  const token = getPermissions();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(token)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

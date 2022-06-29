import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, redirectTo }: { children: any, redirectTo: any }) {
  const token = localStorage.getItem('auth-token');
  if (token) {
    return children;
  }
  return <Navigate to={redirectTo} />;
}
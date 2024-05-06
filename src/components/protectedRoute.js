
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const playerId = localStorage.getItem('playerId');

  if (token && playerId) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

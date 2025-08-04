import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import AuthProvider from './AuthProvider';
import  {useAuth}  from './AuthProvider';


function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
export default ProtectedRoute;

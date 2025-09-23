import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");


  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  // If token exists, render child components
  return <Outlet />;
};

export default ProtectedRoute;

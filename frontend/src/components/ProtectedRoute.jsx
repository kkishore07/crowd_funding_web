import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const ProtectedRoute = ({ children, requireRole = null }) => {
  const token = sessionStorage.getItem("token");
  const isLoggedin = sessionStorage.getItem("isLoggedin") === "true";
  const userRole = sessionStorage.getItem("role");

  // Check if user is authenticated
  if (!isLoggedin || !token || !isTokenValid(token)) {
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  // Check if specific role is required
  if (requireRole) {
    if (Array.isArray(requireRole)) {
      // Multiple roles allowed
      if (!requireRole.includes(userRole)) {
        return <Navigate to="/" />;
      }
    } else {
      // Single role required
      if (userRole !== requireRole && userRole !== "admin") {
        return <Navigate to="/" />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;

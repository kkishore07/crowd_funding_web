import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid, getUserRole } from "../utils/auth";

// Higher-order component for role-based route protection
const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = sessionStorage.getItem("token");
  const isLoggedin = sessionStorage.getItem("isLoggedin") === "true";

  // Check authentication
  if (!isLoggedin || !token || !isTokenValid(token)) {
    sessionStorage.clear();
    return <Navigate to="/login" />;
  }

  // Check role authorization
  const userRole = getUserRole(token);
  
  // Admin has access to everything
  if (userRole === "admin") {
    return children;
  }

  // Check if user's role is in allowed roles
  if (!allowedRoles.includes(userRole)) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>Access Denied</h1>
          <p style={{ color: '#666', marginBottom: '16px' }}>
            You don't have permission to access this page.
          </p>
          <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
            Required role: {allowedRoles.join(" or ")}
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default RoleProtectedRoute;

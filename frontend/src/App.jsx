import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

// Simple Dashboard after login
const Dashboard = () => {
  const isLoggedin = sessionStorage.getItem("isLoggedin") === "true";
  const userName = sessionStorage.getItem("userName");
  const userRole = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/login";
  };

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
            CrowdFunding
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
              <span style={{ color: '#666' }}>Welcome, </span>
              <strong>{userName}</strong>
              <span className="badge badge-primary" style={{ marginLeft: '8px' }}>
                {userRole}
              </span>
            </div>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '12px' }}>
            Welcome to Your Dashboard
          </h2>
          <p style={{ fontSize: '18px', color: '#666' }}>
            You are successfully logged in as a {userRole}
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

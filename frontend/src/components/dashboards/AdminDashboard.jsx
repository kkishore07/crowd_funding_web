import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="dashboard-nav-top">
            <h1 className="dashboard-logo">CrowdFunding</h1>
            <div className="dashboard-user-info">
              <span className="dashboard-user-name">Welcome, <strong>{userName}</strong></span>
              <span className="dashboard-badge dashboard-badge-admin">Admin</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Admin Dashboard</h2>
          <p className="dashboard-subtitle">Manage platform users and campaigns</p>
        </div>
        
        <div className="dashboard-grid">
          {/* Manage Users */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Manage Users</h3>
              <p className="dashboard-card-description">View and manage all users.</p>
            </div>
            <button className="dashboard-card-button">
              Manage
            </button>
          </div>

          {/* Manage Campaigns */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-success">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Manage Campaigns</h3>
              <p className="dashboard-card-description">Review all campaigns.</p>
            </div>
            <button className="dashboard-card-button">
              Manage
            </button>
          </div>

          {/* Reports */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Reports</h3>
              <p className="dashboard-card-description">View platform analytics.</p>
            </div>
            <button className="dashboard-card-button">
              View
            </button>
          </div>

          {/* Settings */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Settings</h3>
              <p className="dashboard-card-description">Configure platform.</p>
            </div>
            <button className="dashboard-card-button">
              Configure
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

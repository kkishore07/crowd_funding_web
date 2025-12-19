import { useNavigate } from "react-router-dom";

const CreatorDashboard = () => {
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
              <span className="dashboard-badge dashboard-badge-creator">Creator</span>
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
          <h2 className="dashboard-title">Creator Dashboard</h2>
          <p className="dashboard-subtitle">Create and manage your crowdfunding campaigns</p>
        </div>
        
        <div className="dashboard-grid">
          {/* Create Campaign */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Create Campaign</h3>
              <p className="dashboard-card-description">Start a new crowdfunding campaign.</p>
            </div>
            <button className="dashboard-card-button">
              Create
            </button>
          </div>

          {/* My Campaigns */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-success">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">My Campaigns</h3>
              <p className="dashboard-card-description">Manage your active campaigns.</p>
            </div>
            <button className="dashboard-card-button">
              Manage
            </button>
          </div>

          {/* Analytics */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Analytics</h3>
              <p className="dashboard-card-description">View campaign performance.</p>
            </div>
            <button className="dashboard-card-button">
              View
            </button>
          </div>

          {/* My Profile */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-orange">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">My Profile</h3>
              <p className="dashboard-card-description">Update your profile.</p>
            </div>
            <button className="dashboard-card-button">
              Edit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;

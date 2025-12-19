import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
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
              <span className="dashboard-badge dashboard-badge-user">Donor</span>
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
          <h2 className="dashboard-title">User Dashboard</h2>
          <p className="dashboard-subtitle">Manage your contributions and explore new campaigns</p>
        </div>
        
        <div className="dashboard-grid">
          {/* Browse Campaigns */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Browse Campaigns</h3>
              <p className="dashboard-card-description">Discover and support various crowdfunding campaigns from creators worldwide.</p>
            </div>
            <button className="dashboard-card-button">
              Explore Now
            </button>
          </div>

          {/* My Contributions */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-success">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">My Contributions</h3>
              <p className="dashboard-card-description">Track and manage all the campaigns you've supported and contributed to.</p>
            </div>
            <button className="dashboard-card-button">
              View History
            </button>
          </div>

          {/* My Profile */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">My Profile</h3>
              <p className="dashboard-card-description">Update your personal information and account preferences.</p>
            </div>
            <button className="dashboard-card-button">
              Edit Profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

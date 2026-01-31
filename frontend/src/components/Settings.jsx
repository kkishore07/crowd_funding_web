import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

const Settings = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(GlobalContext);
  const userName = user?.name || sessionStorage.getItem("userName");

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="dashboard-nav-top">
            <h1 className="dashboard-logo">CrowdFunding</h1>
            <div className="dashboard-user-info">
              <span className="dashboard-user-name">Welcome, <strong>{userName}</strong></span>
              <span className="dashboard-badge dashboard-badge-admin">Admin</span>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Settings</h2>
          <button onClick={() => navigate("/admin-dashboard")} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>
        
        <div className="dashboard-content">
          <div className="settings-section">
            <h3>Platform Settings</h3>
            <p>Configure your crowdfunding platform settings here.</p>
            
            <div className="settings-group">
              <label htmlFor="commission">Commission Rate (%)</label>
              <input type="number" id="commission" defaultValue="5" disabled />
            </div>

            <div className="settings-group">
              <label htmlFor="minDonation">Minimum Donation Amount ($)</label>
              <input type="number" id="minDonation" defaultValue="1" disabled />
            </div>

            <div className="settings-group">
              <label htmlFor="maxDonation">Maximum Donation Amount ($)</label>
              <input type="number" id="maxDonation" defaultValue="10000" disabled />
            </div>

            <div className="settings-group">
              <label htmlFor="campaignTimeout">Campaign Duration (days)</label>
              <input type="number" id="campaignTimeout" defaultValue="30" disabled />
            </div>

            <button className="btn btn-primary" disabled>Save Settings</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;

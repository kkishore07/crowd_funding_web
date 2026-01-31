import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import { API_URL } from "../../utils/api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(GlobalContext);
  const userName = user?.name || sessionStorage.getItem("userName");
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [campaignError, setCampaignError] = useState("");
  const [campaignLoading, setCampaignLoading] = useState(true);

  useEffect(() => {
    const fetchTopCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/campaigns?status=approved`);
        const data = await response.json();
        if (response.ok) {
          const campaigns = Array.isArray(data.campaigns) ? data.campaigns : [];
          setTopCampaigns(campaigns.slice(0, 3));
        } else {
          setCampaignError(data.message || "Failed to load campaigns");
        }
      } catch (error) {
        setCampaignError("Failed to load campaigns");
      } finally {
        setCampaignLoading(false);
      }
    };

    fetchTopCampaigns();
  }, []);

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="dashboard-nav-top">
            <h1 className="dashboard-logo">CrowdFunding</h1>
            <div className="dashboard-user-info">
              <span className="dashboard-user-name">Welcome, <strong>{userName}</strong></span>
              <span className="dashboard-badge dashboard-badge-user">Donor</span>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div style={{ marginBottom: "32px" }}>
          <div className="dashboard-header" style={{ padding: 0 }}>
            <h2 className="dashboard-title">Top Campaigns</h2>
          </div>

          {campaignLoading && <p>Loading campaigns...</p>}
          {campaignError && <p className="alert alert-error">{campaignError}</p>}

          {!campaignLoading && !campaignError && topCampaigns.length === 0 && (
            <p style={{ color: "#666" }}>No campaigns available.</p>
          )}

          {!campaignLoading && !campaignError && topCampaigns.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {topCampaigns.map((campaign) => (
                <div key={campaign._id} className="campaign-card" style={{ padding: 0, height: "fit-content" }}>
                  {campaign.image ? (
                    <img
                      src={`${API_URL}/uploads/${campaign.image}`}
                      alt={campaign.title}
                      style={{
                        width: "100%",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0"
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: "100%", 
                      height: "120px", 
                      backgroundColor: "#f0f0f0", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      fontSize: "32px",
                      borderRadius: "12px 12px 0 0"
                    }}>🎯</div>
                  )}
                  <div style={{ padding: "10px" }}>
                    <h3 style={{ marginBottom: "6px", fontSize: "14px", fontWeight: "600" }}>{campaign.title.substring(0, 30)}</h3>
                    <p style={{ color: "#666", marginBottom: "8px", fontSize: "12px" }}>
                      {campaign.description?.substring(0, 60)}...
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px" }}>
                      <span style={{ color: "#666" }}>
                        ₹{campaign.currentAmount}
                      </span>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/campaign/${campaign._id}/donate`)}
                        style={{ padding: "4px 10px", fontSize: "11px" }}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-header">
          <h2 className="dashboard-title">Donor Dashboard</h2>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navigate("/campaigns")}>
            <div className="dashboard-card-icon dashboard-card-icon-primary">🔍</div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">Browse Campaigns</h3>
              <p className="dashboard-card-description">Discover amazing projects to support</p>
            </div>
            <button className="dashboard-card-button">Explore</button>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/my-donations")}>
            <div className="dashboard-card-icon dashboard-card-icon-success">💳</div>
            <div className="dashboard-card-content">
              <h3 className="dashboard-card-title">My Donations</h3>
              <p className="dashboard-card-description">Track your contributions</p>
            </div>
            <button className="dashboard-card-button">View</button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-icon dashboard-card-icon-purple">👤</div>
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

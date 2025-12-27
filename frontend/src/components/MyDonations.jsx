import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";
import "../styles/donation.css";

const MyDonations = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    fetch(`${API_URL}/api/donations/user/my-donations`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(async (r) => {
        const data = await r.json();
        
        // Handle authentication errors
        if (r.status === 401) {
          sessionStorage.removeItem("token");
          setError("Session expired. Please login again.");
          setTimeout(() => navigate("/login"), 2000);
          setLoading(false);
          return;
        }
        
        if (!r.ok) {
          console.error("Server error:", data);
          throw new Error(data.message || `Server error: ${r.status}`);
        }
        
        setDonations(data.donations || []);
        setLoading(false);
      })
      .catch((err) => { 
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load donations"); 
        setLoading(false); 
      });
  }, [token, navigate]);

  if (!token) return <div className="dashboard-container"><p className="donation-error">Please login first</p></div>;
  if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">My Donations</h2>
        </div>

        {error && <div className="donation-error">{error}</div>}

        {donations.length === 0 ? (
          <div className="empty-donations">
            <p>No donations yet. Start supporting campaigns!</p>
          </div>
        ) : (
          <div className="donations-list">
            {donations.map((d) => (
              <div key={d._id} className="donation-item">
                <div className="donation-details">
                  <strong>{d.campaign?.title || "Campaign"}</strong>
                  <small>Donated on {new Date(d.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="donation-amount">₹{d.amount.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyDonations;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";
import "../styles/donation.css";

const Donate = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/campaigns/${campaignId}`)
      .then(r => r.json())
      .then(d => { setCampaign(d.campaign); setLoading(false); })
      .catch(() => { setError("Campaign not found"); setLoading(false); });
  }, [campaignId]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError("Enter valid amount");
      return;
    }
    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ campaignId, amount: parseFloat(amount) }),
      });

      const data = await res.json();
      
      // Handle authentication errors
      if (res.status === 401) {
        sessionStorage.removeItem("token");
        setError("Session expired. Please login again.");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }
      
      if (res.ok) {
        setSuccess("Donation successful!");
        setAmount("");
        setTimeout(() => navigate("/campaigns"), 2000);
      } else {
        setError(data.message || "Donation failed");
      }
    } catch (err) {
      setError("Error processing donation");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="dashboard-container"><p>Loading...</p></div>;
  if (!campaign) return <div className="dashboard-container"><p className="donation-error">Campaign not found</p></div>;

  const progress = Math.min((campaign.currentAmount / campaign.targetAmount) * 100, 100);

  return (
    <div className="dashboard-container">
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">Support Campaign</h2>
        </div>

        <div className="donation-form-container">
          <div className="donation-info">
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
          </div>

          <div className="donation-progress">
            Progress: ₹{campaign.currentAmount} of ₹{campaign.targetAmount}
            <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "3px", marginTop: "8px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "var(--primary)", width: `${progress}%` }} />
            </div>
          </div>

          {error && <div className="donation-error">{error}</div>}
          {success && <div className="donation-success">{success}</div>}

          <form onSubmit={handleDonate} className="donation-form">
            <div className="form-group">
              <label className="form-label">Donation Amount (₹) *</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => { setAmount(e.target.value); setError(""); }}
                className="input"
                placeholder="Enter amount"
                min="1"
                step="0.01"
                required
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
              {loading ? "Processing..." : "Donate Now"}
            </button>
            <button type="button" onClick={() => navigate("/campaigns")} className="btn btn-secondary btn-lg">
              Cancel
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Donate;

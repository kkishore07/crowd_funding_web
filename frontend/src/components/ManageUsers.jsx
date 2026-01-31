import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import { API_URL } from "../utils/api";

const ManageUsers = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = user?.name || sessionStorage.getItem("userName");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/auth/users`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="dashboard-title">Manage Users</h2>
          <button onClick={() => navigate("/admin-dashboard")} className="btn btn-secondary">
            Back to Dashboard
          </button>
        </div>

        <div className="dashboard-content">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => (
                      <tr key={u._id}>
                        <td>{u._id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>Active</td>
                        <td>
                          <button className="btn btn-small btn-secondary">Edit</button>
                          <button className="btn btn-small btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;

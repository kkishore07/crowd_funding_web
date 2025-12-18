import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("isLoggedin", "true");
        sessionStorage.setItem("role", result.user.role);
        sessionStorage.setItem("userName", result.user.name);
        sessionStorage.setItem("userId", result.user.id);

        setSuccess("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError(result.message || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Please login.");
        setTimeout(() => {
          setIsRegisterMode(false);
          setFormData({ name: "", email: "", password: "", role: "user" });
          setSuccess("");
        }, 2000);
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {isRegisterMode ? "Create Account" : "Welcome Back"}
            </h1>
            <p style={{ color: '#666' }}>
              {isRegisterMode 
                ? "Join our crowdfunding community" 
                : "Sign in to continue to your account"}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div style={{ background: '#fee', borderLeft: '4px solid #dc2626', color: '#991b1b', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#d1fae5', borderLeft: '4px solid #16a34a', color: '#065f46', padding: '12px', borderRadius: '6px', marginBottom: '20px' }}>
              {success}
            </div>
          )}

          <form onSubmit={isRegisterMode ? handleRegister : handleSubmit}>
            {/* Name Field (Register only) */}
            {isRegisterMode && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="your.email@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {/* Role Field (Register only) */}
            {isRegisterMode && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
                  Register As
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="user">Donor (Support campaigns)</option>
                  <option value="creator">Creator (Start campaigns)</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Processing...' : isRegisterMode ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
                setSuccess("");
                setFormData({ name: "", email: "", password: "", role: "user" });
              }}
              style={{ background: 'none', border: 'none', fontSize: '14px', color: '#666' }}
            >
              {isRegisterMode ? (
                <>
                  Already have an account?{" "}
                  <span style={{ fontWeight: '600', color: '#2563eb' }}>Sign In</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span style={{ fontWeight: '600', color: '#2563eb' }}>Create One</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

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
    <div className="auth-page">
      <div className="auth-card card">
        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">
            {isRegisterMode ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="auth-subtitle">
            {isRegisterMode
              ? "Join our crowdfunding community"
              : "Sign in to continue to your account"}
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success">
            {success}
          </div>
        )}

        <form onSubmit={isRegisterMode ? handleRegister : handleSubmit}>
          {/* Name Field (Register only) */}
          {isRegisterMode && (
            <div className="form-group">
              <label className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Manoj"
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="your.email@gmail.com"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">
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
            <div className="form-group">
              <label className="form-label">
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
            className="btn btn-primary btn-block"
          >
            {loading ? "Processing..." : isRegisterMode ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="auth-footer">
          <button
            type="button"
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setError("");
              setSuccess("");
              setFormData({ name: "", email: "", password: "", role: "user" });
            }}
            className="auth-toggle"
          >
            {isRegisterMode ? (
              <>
                Already have an account?{" "}
                <span>Sign In</span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span>Create One</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

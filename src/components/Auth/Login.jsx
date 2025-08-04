import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await login(formData);
    setSubmitting(false);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Username / Email</label>
        <input
          type="text"
          name="username"
          className="form-input"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="password-input-container">
          <input
            type={showPw ? "text" : "password"}
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button className="btn btn-primary w-full" disabled={submitting}>
        {submitting ? <LoadingSpinner size="sm" /> : "Sign In"}
      </button>
    </form>
  );
};

export default Login;

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { register } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    gender: "male",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setSubmitting(true);
    await register(formData);
    setSubmitting(false);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="form-input"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Username</label>
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
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Gender</label>
        <select
          name="gender"
          className="form-input"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
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

      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <div className="password-input-container">
          <input
            type={showPw2 ? "text" : "password"}
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPw2(!showPw2)}
          >
            {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button className="btn btn-primary w-full" disabled={submitting}>
        {submitting ? <LoadingSpinner size="sm" /> : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;

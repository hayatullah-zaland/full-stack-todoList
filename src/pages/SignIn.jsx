import React, { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    console.log("Signed in:", formData);
    // Add your login logic here
  };

  return (
    <div className="signin-page">
      <form className="signin-box" onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>
        <p className="subtitle">Welcome back! Please enter your details.</p>

        {error && <div className="error-box">{error}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>

        <div className="options">
          <label className="checkbox">
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" className="submit-btn">
          Sign In
        </button>

        <p className="footer">
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.isEmpty(formData.name.trim())) {
      setError("Name is required");
      return;
    }

    if (!validator.isEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!validator.isLength(formData.password, { min: 6 })) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        formData
      );

      console.log("Signup successful:", response.data);

      setSuccess("User registered successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
          error.response.data.error ||
          "Registration failed"
        );
      } else {
        setError("Cannot connect to server");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">

        <h2>Create Account</h2>

        <p>Sign up to continue</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="signup-error">
              {error}
            </p>
          )}

          {success && (
            <p className="signup-success">
              {success}
            </p>
          )}

          <button type="submit">
            Sign Up
          </button>

        </form>

        <div className="signup-login">
          Already have an account?

          <Link to="/signin">
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;

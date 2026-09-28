import React, { useContext, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import { UserContext } from "../context/UserContxt";

const SignIn = () => {
  const { setUsers } = useContext(UserContext);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (validator.isEmpty(email.trim())) {
      setError("Email is required");
      return;
    }

    if (!validator.isEmail(email.trim())) {
      setError("Please enter a valid email");
      return;
    }

    if (validator.isEmpty(password)) {
      setError("Password is required");
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email: email.trim(),
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      setUsers(res.data.user);

      setSuccess("Login successful!");

      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      console.error("Signin failed:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid email or password"
        );
      } else {
        setError("Cannot connect to the server");
      }
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">

        <h2>Welcome Back</h2>

        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-wrapper">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>
          </div>

          {error && (
            <p className="signin-error">
              {error}
            </p>
          )}

          {success && (
            <p className="signin-success">
              {success}
            </p>
          )}

          <button type="submit">
            Sign In
          </button>

        </form>

        <div className="signin-signup">
          <span>Don't have an account?</span>

          <Link to="/signup">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
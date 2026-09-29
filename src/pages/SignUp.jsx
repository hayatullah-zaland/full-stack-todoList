
import React, { useContext, useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "./Signup.css";
import { UserContext } from "../context/UserContxt";
import toast from "react-hot-toast";

const Signup = () => {
  const {user,setUsers}=useContext(UserContext)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (validator.isEmpty(name.trim())) {
      setError("Name is required");
      return;
    }

    if (!validator.isEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!validator.isLength(password, { min: 6 })) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
    const res = await axios.post(
  "http://localhost:3000/api/v1/users/register",
  {
    name,
    email,
    password,
  }
);

      
      localStorage.setItem("token",res.data.token)
      setUsers(res.data.user)
      setSuccess("User registered successfully!");

      setName("");
      setEmail("");
      setPassword("");

      navigate('/')
      toast.success("Account created Successfully")
      
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.response) {
        setError(
          error.response.data.message || "Registration failed"
        );
      } else {
        setError("Cannot connect to the server");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="signup-error">{error}</p>}

          {success && <p className="signup-success">{success}</p>}

          <button type="submit">Sign Up</button>
        </form>

        <div className="signup-login">
          Already have an account?

          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

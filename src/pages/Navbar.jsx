import React, { useState, useEffect, useContext } from "react";
import {
  ListTodo,
  Sun,
  Moon,
  CheckCircle2,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { TodoContext } from "../context/TodoContexts";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const { todoes } = useContext(TodoContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const completed = todoes.filter((todo) => todo.completed);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/signup");
  };

  return (
    <nav className="navbar">

      <div className="navbar-left">
        <ListTodo size={26} className="navbar-logo" />

        <h1 className="navbar-title">
          Task Manager
        </h1>
      </div>


      <div className="navbar-right">

        <div className="navbar-stat">
          <CheckCircle2 size={18} />
          <span>{completed.length}</span>
        </div>


        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>


        <div className="auth-buttons">

          {!token ? (
            <>
              <Link
                to="/signin"
                className="signin-button"
              >
                <LogIn size={18} />

                <span>
                  Sign In
                </span>
              </Link>


              <Link
                to="/signup"
                className="signup-button"
              >
                <UserPlus size={18} />

                <span>
                  Sign Up
                </span>
              </Link>
            </>
          ) : (
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <LogOut size={18} />

              <span>
                Logout
              </span>
            </button>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect, useContext } from 'react'
import { ListTodo, Sun, Moon, CheckCircle2, LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { TodoContext } from "../context/TodoContexts";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false)
  const { todoes } = useContext(TodoContext);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ListTodo size={26} className="navbar-logo" />
        <h1 className="navbar-title">ToDoList</h1>
      </div>

      <div className="navbar-right">
        <div className="navbar-stat">
          <CheckCircle2 size={18} />
          <span>{todoes.length}</span>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="auth-buttons">

          <Link to="/signin" className="signin-button">
            <LogIn size={18} />
            <span>Sign In</span>
          </Link>

          <Link to="/signup" className="signup-button">
            <UserPlus size={18} />
            <span>Sign Up</span>
          </Link>

        </div>
      </div>
    </nav>
  )
}

export default Navbar

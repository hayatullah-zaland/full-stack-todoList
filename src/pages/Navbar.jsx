import React, { useState, useEffect, useContext } from 'react'
import { ListTodo, Sun, Moon, CheckCircle2 } from 'lucide-react'
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
      </div>
    </nav>
  )
}

export default Navbar
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Categories from "./components/Categories";
import Settings from "./components/Settings";
import AddTodoes from "./components/AddTodoes";

import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";

import Navbar from "./pages/Navbar";

import "./App.css";
import "./index.css";


// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};


const App = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  const isAuthPage =location.pathname === "/signup" || location.pathname === "/signin";

  return (
    <div className="app">

      {/* Navbar and Sidebar only for logged-in users */}
      {token && !isAuthPage && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}

      <div className={token && !isAuthPage ? "page" : ""}>

        <Routes>

          {/* Default Page */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/signup" replace />
              )
            }
          />

          {/* Signup */}
          <Route
            path="/signup"
            element={
              token ? (
                <Navigate to="/home" replace />
              ) : (
                <Signup />
              )
            }
          />

          {/* Signin */}
          <Route
            path="/signin"
            element={
              token ? (
                <Navigate to="/home" replace />
              ) : (
                <SignIn />
              )
            }
          />

          {/* Protected Pages */}

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/todoes"
            element={
              <ProtectedRoute>
                <AddTodoes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Unknown URL */}
          <Route
            path="*"
            element={
              <Navigate
                to={token ? "/home" : "/signup"}
                replace
              />
            }
          />

        </Routes>

      </div>
    </div>
  );
};

export default App;
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Settings from "./components/Settings";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
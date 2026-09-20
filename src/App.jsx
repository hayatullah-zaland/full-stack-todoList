import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Categories from "./components/Categories";
import Settings from "./components/Settings";
import AddTodoes from "./components/AddTodoes";
import "./App.css";
import "./index.css";
import Navbar from "./pages/Navbar";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todoes" element={<AddTodoes/>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
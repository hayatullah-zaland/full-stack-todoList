import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>My App</h2>
      <Link to="/">🏠 Home</Link>
      <Link to="/categories">📁 Categories</Link>
      <Link to="/settings">⚙️ Settings</Link>
    </div>
  );
};

export default Sidebar;
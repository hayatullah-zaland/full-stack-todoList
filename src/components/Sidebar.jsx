import { Link } from "react-router-dom";
import "./Sidebar.css";
import {Home, AdIcon, Package2Icon, Settings} from "lucide-react"
import { useContext } from "react";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>My App</h2>
      <Link to="/"><Home size={30}/> Home</Link>
      <Link to="/todoes"><AdIcon size={30}/> Add Todoes</Link>
      <Link to="/categories"> <Package2Icon size={30}/> Categories</Link>
      <Link to="/settings"><Settings size={30}/> Settings</Link>
    </div>
  );
};

export default Sidebar;
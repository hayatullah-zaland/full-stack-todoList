import { useContext, useState } from "react";
import "./Categories.css";
import { Folder, Briefcase, User, ShoppingCart, BookOpen } from "lucide-react";
import { TodoContext } from "../context/TodoContexts";

const Categories = () => {

  const {todoes}=useContext(TodoContext)
  return (
    <div className="categories">
      <h1>Categories</h1>
      <p className="sub">Organize your todos by category</p>

        <div>
          <h2>{todoes.categories}</h2>
        </div>
      </div>
  );
};

export default Categories;

import { useContext, useState } from "react";
import "./Categories.css";
import {
  Folder,
  Briefcase,
  User,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { TodoContext } from "../context/TodoContexts";

const Categories = () => {
  const { todoes } = useContext(TodoContext);
  const [newTodoes, setNewTodoes] = useState(todoes);

  const getWork = () => {
    setNewTodoes(todoes.filter((todo) => todo.category === "Work"));
  };

  const getPersonal = () => {
    setNewTodoes(todoes.filter((todo) => todo.category === "Personal"));
  };

  const getShopping = () => {
    setNewTodoes(todoes.filter((todo) => todo.category === "Shopping"));
  };

  const getStudy = () => {
    setNewTodoes(todoes.filter((todo) => todo.category === "Study"));
  };

  return (
    <div className="categories">
      <div className="categories-header">
        <div>
          <h1>Categories</h1>
          <p className="sub">Organize your todos by category</p>
        </div>

        <div className="total-category">
          <span>{newTodoes.length}</span>
          <small>Todos</small>
        </div>
      </div>

      <div className="category-buttons">
        <button
          className="category-btn active"
          onClick={() => setNewTodoes(todoes)}
        >
          <Folder size={19} />
          <span>All</span>
          <b>{todoes.length}</b>
        </button>

        <button className="category-btn" onClick={getWork}>
          <Briefcase size={19} />
          <span>Work</span>
        </button>

        <button className="category-btn" onClick={getPersonal}>
          <User size={19} />
          <span>Personal</span>
        </button>

        <button className="category-btn" onClick={getShopping}>
          <ShoppingCart size={19} />
          <span>Shopping</span>
        </button>

        <button className="category-btn" onClick={getStudy}>
          <BookOpen size={19} />
          <span>Study</span>
        </button>
      </div>

      <div className="category-list">
        {newTodoes.length > 0 ? (
          newTodoes.map((todo) => (
            <div key={todo._id} className="category-item">
              <div className="todo-icon">
                <Folder size={18} />
              </div>

              <div className="todo-info">
                <h3>{todo.title}</h3>

                {todo.description && (
                  <p>{todo.description}</p>
                )}

                {todo.category && (
                  <span className="todo-category">
                    {todo.category}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-category">
            <Folder size={42} />
            <h3>No todos found</h3>
            <p>There are no todos in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

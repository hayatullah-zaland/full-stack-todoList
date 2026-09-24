import React, { useContext, useEffect, useState } from "react";
import "./AddTodoes.css";
import { Trash2, Pencil, ListTodo } from "lucide-react";
import axios from "axios";
import { TodoContext } from "../context/TodoContexts";
import DeleteToast from "../pages/DeleteToast";
import CreateToast from "../pages/CreateToast";
import Form from "./Form";
import toast from "react-hot-toast";

const AddTodoes = () => {
  const { todoes, setTodoes } = useContext(TodoContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/todoes")
      .then((res) => setTodoes(res.data))
      .catch((error) => console.log(error));
  }, [setTodoes]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:3000/api/v1/todoes/${editId}`, {
          title,
          description,
        });
        setEditId(null);
        toast.success("Todo updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/v1/todoes", {
          title,
          description,
        });
        toast.success("Todo created successfully!");
      }

      const res = await axios.get("http://localhost:3000/api/v1/todoes");
      setTodoes(res.data);
      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/api/v1/todoes/${id}`);
    setTodoes(todoes.filter((todo) => todo._id !== id));
      toast.error("Todo deleted!");
  };

  const updateTodo = (id) => {
    const found = todoes.find((todo) => todo._id === id);
    setTitle(found.title);
    setDescription(found.description);
    setEditId(id);
    
  };

  const completeTodo = async (id, currentStatus) => {
  await axios.put(`http://localhost:3000/api/v1/todoes/${id}`, {
    completed: !currentStatus,
  });
  const res = await axios.get("http://localhost:3000/api/v1/todoes");
  setTodoes(res.data);
  toast.success(currentStatus ? "Todo uncompleted!" : "Todo completed! ✅");
};

  return (
    <div className="todo-page">
      <div className="todo-container">

        <div className="todo-header">
          <div className="todo-header-icon">
            <ListTodo size={22} />
          </div>
          <div>
          
            <h1>{editId ? "Update Todo" : "Add New Todo"}</h1>
            <p>Create tasks and keep your work organized.</p>
          </div>
        </div>

        <Form
          handelSubmit={handleSubmit}
          setDescription={setDescription}
          setTitle={setTitle}
          error={error}
          title={title}
          description={description}
          isEditing={editId !== null}
        />

        <div className="todo-section">
          <div className="section-title">
            <div className="section-heading">
              <h2>My Todos</h2>
              <p>Manage your daily tasks</p>
            </div>
            <span className="task-count">{todoes.length} Tasks</span>
          </div>

          <div className="todo-list">
            {todoes.length === 0 ? (
              <div className="empty-todos">
                <ListTodo size={38} />
                <h3>No Todos Yet</h3>
                <p>Create your first task to get started.</p>
              </div>
            ) : (
              todoes.map((todo) => (
                <div className="todo-card" key={todo._id}>
                  <div className="todo-card-line"></div>
                  <div className="todo-content">
                    <div className="todo-info">
                      <h3>{todo.title}</h3>
                      <p>{todo.description}</p>
                      <span className="todo-time">{todo.createdAt}</span>
                    </div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => completeTodo(todo._id, todo.completed)}
                    title="Mark as complete"
                    className="complete-checkbox"
                  />
                    <div className="todo-actions">
                      <button
                        className="action-button update-button"
                        type="button"
                        onClick={() => updateTodo(todo._id)}
                        title="Update Todo"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        className="action-button delete-button"
                        type="button"
                        onClick={() => deleteTodo(todo._id)}
                        title="Delete Todo"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddTodoes;
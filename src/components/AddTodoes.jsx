import React, { useContext, useEffect, useState } from "react";
import "./AddTodoes.css";
import { Trash2, Pencil, ListTodo } from "lucide-react";
import axios from "axios";
import { TodoContext } from "../context/TodoContexts";
import Form from "./Form";
import toast from "react-hot-toast";
import TodoCard from "./TodoCard";

const AddTodoes = () => {
  const { todoes, setTodoes } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null); 
  const [category, setCategory] = useState("");

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
          category
        });
        setEditId(null);
        toast.success("Todo updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/v1/todoes", {
          title,
          description,
          category
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
    setCategory(found.category);
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
          category={category}
          setCategory={setCategory}
          
        />
        <TodoCard todoes={todoes} completeTodo={completeTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      </div>
    </div>
  );
};

export default AddTodoes;
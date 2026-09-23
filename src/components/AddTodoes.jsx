  import React, { useContext, useEffect, useState } from "react";
  import "./AddTodoes.css";
  import { Trash2, Pencil, Plus, ListTodo } from "lucide-react";
  import axios from "axios";
  import { TodoContext } from "../context/TodoContexts";
  import DeleteToast from "../pages/DeleteToast";
  import CreateToast from "../pages/CreateToast";
  import Form from "./Form";

  const AddTodoes = () => {
    const { todoes, setTodoes } = useContext(TodoContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [showCreateToast, setShowCreateToast] = useState(false);

    useEffect(() => {
      axios
          .get("http://localhost:3000/api/v1/todoes")
          .then((res) => {
            setTodoes(res.data);
          })
        .catch((error) => {
          console.log(error);
        });
    }, [setTodoes]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/v1/todoes", {
        title,
        description,
      });

      const res = await axios.get("http://localhost:3000/api/v1/todoes");
      setTodoes(res.data);
      setTitle("");
      setDescription("");
      setError("");
      setShowCreateToast(true)
      setTimeout(()=>{
        setShowCreateToast(false)
      },3000)
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    }
  };

  const deleteTodo=(id)=>{
    axios.delete(`http://localhost:3000/api/v1/todoes/${id}`)
    const deletetodo=todoes.filter((todo) =>todo._id !==id)
    setShowDeleteToast(true);
    setTimeout(() => {
      setShowDeleteToast(false);
    }, 3000);
    setTodoes(deletetodo)

  }

    return (
      <div className="todo-page">
        {showDeleteToast && <DeleteToast />}
        {showCreateToast && <CreateToast/>}
        <div className="todo-container">

          <div className="todo-header">
            <div className="todo-header-icon">
              <ListTodo size={22} />
            </div>

            <div>
              <h1>Add New Todo</h1>
              <p>Create tasks and keep your work organized.</p>
            </div>
          </div>

        
          <Form handelSubmit={handleSubmit} setDescription={setDescription} setTitle={setTitle} error={error}/>

          <div className="todo-section">

            <div className="section-title">
              <div className="section-heading">
                <h2>My Todos</h2>
                <p>Manage your daily tasks</p>
              </div>

              <span className="task-count">
                {todoes.length} Tasks
              </span>
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
                        { 
                          <span className="todo-time">
                            {todo.createdAt}
                          </span>}
                      </div>

                      <div className="todo-actions">

                        <button
                          className="action-button update-button"
                          type="button"
                          onClick={() => handleUpdate(todo._id)}
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
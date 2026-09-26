import React from "react";
import "./Form.css"
import { Plus, Save } from "lucide-react";

const Form = ({ handelSubmit, error, setDescription, setTitle, title, description, isEditing ,category,setCategory}) => {
  return (
    <form className="todo-form" onSubmit={handelSubmit}>

      <div className="form-group">
        <label htmlFor="title">Todo Title</label>
        <input
          id="title"
          className="todo-input"
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="todo-textarea"
          placeholder="Enter todo description..."
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

       <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="todo-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          <option value="Work">💼 Work</option>
          <option value="Personal">👤 Personal</option>
          <option value="Shopping">🛒 Shopping</option>
          <option value="Study">📚 Study</option>
        </select>
      </div>

      {error && <p className="todo-error">{error}</p>}

      <button className="add-button" type="submit">
    
        {isEditing ? <Save size={19} /> : <Plus size={19} />}
        <span>{isEditing ? "Update Todo" : "Add Todo"}</span>
      </button>

    </form>
  );
};

export default Form;
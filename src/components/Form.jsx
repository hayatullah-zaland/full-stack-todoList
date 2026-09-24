import React from "react";
import { Plus, Save } from "lucide-react";

const Form = ({ handelSubmit, error, setDescription, setTitle, title, description, isEditing }) => {
  return (
    <form className="todo-form" onSubmit={handelSubmit}>

      <div className="form-group">
        <label htmlFor="title">Todo Title</label>
        <input
          id="title"
          className="todo-input"
          type="text"
          placeholder="Enter todo title..."
          value={title}        // ✅ value اضافه شو
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          className="todo-textarea"
          placeholder="Enter todo description..."
          value={description}  // ✅ value اضافه شو
          onChange={(e) => setDescription(e.target.value)}
        />
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
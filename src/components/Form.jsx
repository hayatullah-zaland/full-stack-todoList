import React from 'react'
import AddTodoes from './AddTodoes'
import {Plus} from "lucide-react"
            

            const Form = ({handelSubmit,error,setDescription,setTitle,title,description}) => {
            return (
             <form className="todo-form" onSubmit={handelSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Todo Title</label>
    
                  <input
                    id="title"
                    className="todo-input"
                    type="text"
                    placeholder="Enter todo title..."
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="description">Description</label>
    
                  <textarea
                    id="description"
                    className="todo-textarea"
                    placeholder="Enter todo description..."
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
    
                {error && <p className="todo-error">{error}</p>}
    
                <button className="add-button" type="submit">
                  <Plus size={19} />
                  <span>Add Todo</span>
                </button>
              </form>
    
  )
}

export default Form
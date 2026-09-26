import React from 'react'
import "./TodoCard.css"
import {ListTodo,Pencil,Trash2} from "lucide-react"

const TodoCard = ({todoes,completeTodo,setCategory,deleteTodo,updateTodo}) => {
  return (
    <>
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
                           {todo.category && (
                            <span className="cat-badge">{todo.category}</span>
                          )}
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
    </>
  )
}

export default TodoCard
import React, { useEffect, useState } from 'react'
import "./AddTodoes.css"
import {Trash2,} from "lucide-react"
import axios from 'axios'

const AddTodoes = () => {
  const [todoes,setTodoes]=useState([])
  const [todoList,setTodoList]=useState([])
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [error,setError]=useState("")

   useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/get").then((res)=>{
      setTodoes(res.data)
    }).catch((error)=>{
      console.log(error);
    })
   },[])

  const handleSubmit = async (id) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    const todo = {
      title,
      description,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/post/" + todo.id, {
        method: "POST",
        body: JSON.stringify(todo),
      });
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <h1>Add Todo</h1>
    <form action="" onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder='Title' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='Description' 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
    <div className="todo-list">
      {todoes.map((todo,index)=>(
        <div className="card" key={index}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>{todo.time}</p>
          <button>
            <Trash2 size={20} color="red" />
          </button>
        </div>
      ))}
    </div>
    </>
  )
}

export default AddTodoes
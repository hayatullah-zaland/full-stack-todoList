import { useEffect, useState } from "react";
import "./Categories.css";
import axios from "axios";

const Categories = () => {
  const [todoes,setTodeos]=useState([])

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/get").then((res)=>{
      setTodeos(res.data)
    }).catch((error)=>{
      console.log(error);
      
    })
  })

  return (
    <div className="categories">
      {todoes.map(todo=>{
        <div className="card">
      <h1>{todoes.title}</h1>
        <h2>{todoes.description}</h2>
        <hr />
        <h4>Description</h4>
        <hr />
        <p>Time</p>
      </div>
      })}

      
    </div>
  );
};

export default Categories;
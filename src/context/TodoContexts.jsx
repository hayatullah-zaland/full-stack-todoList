import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todoes, setTodoes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/todoes")
      .then((res) => {
        setTodoes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
  }, []);

  return (
    <TodoContext.Provider value={{ todoes, setTodoes }}>
      {children}
    </TodoContext.Provider>
  );
};
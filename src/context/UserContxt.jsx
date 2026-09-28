import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/users/getuser", {
  headers: {
    token: token,
  },
});
  },[token])

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
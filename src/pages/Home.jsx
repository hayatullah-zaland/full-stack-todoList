import { useContext } from "react";
import "./Home.css";
import { TodoContext } from "../context/TodoContexts";

const Home = () => {
  const { todoes } = useContext(TodoContext);

  return (
    <div className="home">
      <h1>Home</h1>

      <div className="boxes">
        <div className="box">
          <h3>Total Todos</h3>
          <p>{todoes.length}</p>
        </div>

        <div className="box">
          <h3>Completed</h3>
          <p>30</p>
        </div>

        <div className="box">
          <h3>Pending</h3>
          <p>20</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
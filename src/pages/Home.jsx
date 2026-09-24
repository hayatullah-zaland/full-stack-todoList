import { useContext } from "react";
import "./Home.css";
import { TodoContext } from "../context/TodoContexts";
import { ClipboardList, CheckCircle, Clock } from "lucide-react";

const Home = () => {
  const { todoes } = useContext(TodoContext);

  const completed  = todoes.filter((todo) => todo.completed);
  const inProgress = todoes.filter((todo) => !todo.completed);

  return (
    <div className="home">

      <div className="home-header">
        <h1>Dashboard</h1>
        <p>Here is your todo summary</p>
      </div>

      <div className="boxes">

        <div className="box">
          <div className="box-top">
            <span className="box-label">Total Todos</span>
            <div className="box-icon blue">
              <ClipboardList size={20} />
            </div>
          </div>
          <p className="box-value">{todoes.length}</p>
          <div className="box-footer blue-footer">All tasks</div>
        </div>

        <div className="box">
          <div className="box-top">
            <span className="box-label">Completed</span>
            <div className="box-icon green">
              <CheckCircle size={20} />
            </div>
          </div>
          <p className="box-value">{completed.length}</p>
          <div className="box-footer green-footer">Done tasks</div>
        </div>

        <div className="box">
          <div className="box-top">
            <span className="box-label">In Progress</span>
            <div className="box-icon purple">
              <Clock size={20} />
            </div>
          </div>
          <p className="box-value">{inProgress.length}</p>
          <div className="box-footer purple-footer">Pending tasks</div>
        </div>

      </div>
    </div>
  );
};

export default Home;
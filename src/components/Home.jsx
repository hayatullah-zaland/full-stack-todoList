import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="boxes">
        <div className="box">
          <h3>Total Todos</h3>
          <p>50</p>
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
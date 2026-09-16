import "./Categories.css";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="cat-list">
        <div className="cat-item">🎨 Design — 10 tasks</div>
        <div className="cat-item">⚙️ Backend — 15 tasks</div>
        <div className="cat-item">📄 Docs — 5 tasks</div>
        <div className="cat-item">🚀 DevOps — 8 tasks</div>
      </div>
    </div>
  );
};

export default Categories;
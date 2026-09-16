import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <h1>Settings</h1>
      <div className="form">
        <label>Name</label>
        <input type="text" placeholder="Your name" />

        <label>Email</label>
        <input type="email" placeholder="Your email" />

        <label>Password</label>
        <input type="password" placeholder="Your password" />

        <button>Save</button>
      </div>
    </div>
  );
};

export default Settings;
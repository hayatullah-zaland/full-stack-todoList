import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { TodoProvider } from "./context/TodoContexts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TodoProvider>
        <Toaster position="top-right" />
      <App />
    </TodoProvider>
  </BrowserRouter>
);
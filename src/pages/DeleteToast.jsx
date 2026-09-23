
import React, { useState } from "react";
import { CheckCircle, X } from "lucide-react";
import "./DeleteToast.css";

const DeleteToast = () => {
  const [showToast, setShowToast] = useState(true);

  if (!showToast) return null;

  return (
    <div className="delete-toast">
      <div className="toast-icon">
        <CheckCircle size={22} />
      </div>

      <div className="toast-content">
        <h4>Todo Deleted</h4>
        <p>Your todo was deleted successfully.</p>
      </div>

      <button
        className="toast-close"
        onClick={() => setShowToast(false)}
      >
        <X size={18} />
      </button>

      <div className="toast-progress"></div>
    </div>
  );
};

export default DeleteToast;

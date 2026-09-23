import React from "react";
import { CheckCircle, X } from "lucide-react";
import "./CreateToast.css";

const CreateToast = ({ onClose }) => {
  return (
    <div className="create-toast">
      <div className="create-toast-icon">
        <CheckCircle size={22} />
      </div>

      <div className="create-toast-content">
        <h4>Todo Created</h4>
        <p>Your todo was created successfully.</p>
      </div>

      <button className="create-toast-close" onClick={onClose}>
        <X size={18} />
      </button>

      <div className="create-toast-progress"></div>
    </div>
  );
};

export default CreateToast;
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

import "./modal.css";

function Modal({ title, children, isOpen, handleClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-wrapper">
      <div className="modal-overlay" onClick={handleClose} />
      <div className="modal-body">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={handleClose}>
            <IoIosCloseCircleOutline size="1.75rem" />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: "No title passed",
};

export default Modal;

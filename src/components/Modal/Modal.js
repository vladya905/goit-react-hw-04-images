import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const Modal = ({ onCloseModal, content }) => {
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={content} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default Modal;
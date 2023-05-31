import React, { Component } from "react";

import PropTypes from "prop-types";

import css from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.code === "Escape") {
      this.props.onCloseModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { content } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={content} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
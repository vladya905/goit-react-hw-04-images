import React from "react";
import PropTypes from "prop-types";

import css from "../Button/Button.module.css";

const Button = ({ onPress }) => {
  return (
    <button type="button" onClick={onPress} className={css.Button}>
      Load more
    </button>
  );
};


Button.propTypes = {
  onPress: PropTypes.func.isRequired,
};


export default Button;
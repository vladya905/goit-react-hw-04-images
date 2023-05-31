import React from "react";
import { ThreeDots } from "react-loader-spinner";

import css from "./Loader.module.css";

const Spinner = () => {
  return (
    <div className={css.Spinner}>
      <ThreeDots color="#00BFFF" height={200} width={200} />
    </div>
  );
};

export default Spinner;
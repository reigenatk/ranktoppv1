import React from "react";
import classes from "./Spinner.css";

// a spinner to show while the data is posting to the server after user purchases

const spinner = () => {
  return <div className={classes.Loader}>Loading... </div>;
};

export default spinner;

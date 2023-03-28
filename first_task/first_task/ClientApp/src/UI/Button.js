import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <React.Fragment>
      {props.disabled && (
        <button
          type={props.type}
          className={`${props.className} ${classes["button-disabled"]}`}
          disabled
        >
          {props.children}
        </button>
      )}
      {!props.disabled && (
        <button
          type={props.type}
          className={`${props.className} ${classes.button}`}
        >
          {props.children}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;

import React from "react";
import "./Button.css";
function Button(props) {
  return (
    <div>
      <button className={`${props.className} btn`} onClick={props.action}>
        {props.name}
      </button>
    </div>
  );
}

export default Button;

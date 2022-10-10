import React from "react";

import "./Socials.css";
function InputData(props) {
  function passdata(event) {
    props.change(event);
  }
  return (
    <div className="dataContainer">
      <div>
        {" "}
        <i className={`${props.className} fav-icon`}></i>
      </div>
      <div>
        {" "}
        <form onChange={passdata}>
          <input
            className="inpData"
            type={props.type}
            placeholder={props.placeholder}
          />
        </form>
      </div>
    </div>
  );
}

export default InputData;

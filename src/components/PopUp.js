import React from "react";

const PopUp = (props) => {
  return (
    <div
      className={
        "container d-flex justify-content-between " +
        (props.open ? "popup-show" : "popup-hide")
      }
      style={{ height: "30px", marginTop: "2px", backgroundColor: "#fda1a1" }}
    >
      <p>{props.message}</p>
      <div onClick={props.close}>
        <span aria-hidden="true" style={{ cursor: "pointer" }}>
          &times;
        </span>
      </div>
    </div>
  );
};

export default PopUp;

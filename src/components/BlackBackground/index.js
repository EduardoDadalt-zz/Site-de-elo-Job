import React from "react";

function BlackBackground(props) {
  return (
    <div
      className="BackgroundBlack"
      onClick={() => {
        props.close();
      }}
    >
      {props.children}
    </div>
  );
}

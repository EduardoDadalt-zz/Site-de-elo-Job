import React from "react";
import "./styles.css";
const BlackBackground = ({ children, close, ...props }) => {
  return (
    <div
      className="BlackBackground"
      onClick={() => {
        if (close) {
          close();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};
export default BlackBackground;

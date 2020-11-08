import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import LoginContext from "../../context/loginContext";
import BlackBackground from "../BlackBackground";
import SingIn from "../SingIn";
import SingUp from "../SingUp";
import "./styles.css";
const Login = () => {
  const { loginActive, setLoginActive, cadastro } = useContext(LoginContext);
  return (
    loginActive && (
      <BlackBackground>
        <div className="p-4 border rounded bg-dark text-white containerLogin">
          <button
            className="border rounded"
            style={{ float: "right" }}
            onClick={() => {
              setLoginActive(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
          </button>
          {cadastro ? <SingUp /> : <SingIn />}
        </div>
      </BlackBackground>
    )
  );
};

export default Login;

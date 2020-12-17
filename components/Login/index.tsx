import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { Auth } from "../../context/auth";
import SingIn from "./SingIn";

const Login = () => {
  const { showLoginModal, closeLoginWindow } = useContext(Auth);

  return (
    <Modal show={showLoginModal} onHide={closeLoginWindow} centered>
      <Modal.Body>
        <SingIn />
      </Modal.Body>
    </Modal>
  );
};

export default Login;

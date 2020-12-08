import React, { useContext } from "react";
import { Form, Modal } from "react-bootstrap";
import { Auth } from "../../context/auth";

const Login = () => {
  const { showLoginModal, closeLoginWindow } = useContext(Auth);

  return (
    <Modal show={showLoginModal} onHide={closeLoginWindow}>
      <Modal.Body>
        <Form>
          <Form.Label>E-mail:</Form.Label>
          <Form.Control />
          <Form.Label>Senha:</Form.Label>
          <Form.Control type="password" />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;

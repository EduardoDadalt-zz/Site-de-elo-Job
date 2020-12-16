import React, { useContext, useEffect, useState } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { Auth } from "../../context/auth";
import SingIn from "./SingIn";
import SingUp from "./SingUp";

const Login = () => {
  const { showLoginModal, closeLoginWindow, cadastroOn } = useContext(Auth);
  const [key, setKey] = useState("login");
  useEffect(() => {
    setKey(cadastroOn ? "register" : "login");
  }, [cadastroOn]);
  return (
    <Modal show={showLoginModal} onHide={closeLoginWindow}>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="login" title="Login">
            <SingIn />
          </Tab>
          <Tab eventKey="register" title="Cadastra-se">
            <SingUp />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};

export default Login;

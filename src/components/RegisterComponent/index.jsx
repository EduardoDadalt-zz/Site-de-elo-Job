import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Auth from "../../context/auth";

const RegisterComponent = () => {
  const { SingUp } = useContext(Auth);

  const [login, setLogin] = useState({ email: "", password: "" });
  function onChangeLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  return (
    <Form>
      <Form.Group>
        <Form.Label>E-mail: </Form.Label>
        <Form.Control
          name="email"
          type="email"
          onChange={onChangeLogin}
          value={login.email}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha: </Form.Label>
        <Form.Control
          name="password"
          type="password"
          onChange={onChangeLogin}
          value={login.password}
        ></Form.Control>
      </Form.Group>
      <Form.Group>
        <Button
          onClick={() => {
            SingUp(login.email, login.password);
          }}
        >
          Cadastre-se
        </Button>
      </Form.Group>
    </Form>
  );
};

export default RegisterComponent;

import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Auth from "../../context/auth";
const LoginComponent = () => {
  const { SingIn } = useContext(Auth);
  const [login, setLogin] = useState({ email: "", password: "" });
  function onChangeLogin(e) {
    setLogin({ ...login, [e.target.name]: e.target.value });
  }
  const [isInvalid, setIsInvalid] = useState({ email: null, password: null });
  return (
    <div>
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
              SingIn(login.email, login.password)
                .then((e) => {
                  console.log(e);
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginComponent;

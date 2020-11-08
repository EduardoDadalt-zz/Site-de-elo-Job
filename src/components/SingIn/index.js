import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../../context/auth";
import "./styles.css";
const SingIn = () => {
  const { SingIn: logar } = useContext(Auth);
  const [{ email, password }, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", other: "" });
  function Submit(e) {
    e.preventDefault();
    setErrors({ email: "", password: "", other: "" });

    logar(email, password)
      .then((e) => {})
      .catch((e) => {
        console.error(e);
        if (e.code.includes("email") || e.code.includes("password")) {
          if (e.code.includes("email")) {
            setErrors({ ...errors, email: e.message });
          }
          if (e.code.includes("password")) {
            setErrors({ ...errors, password: e.message });
          }
        } else {
          setErrors({ ...errors, other: e.message });
        }
      });
  }
  function onChangeUser(e) {
    setUser({ email, password, [e.target.type]: e.target.value });
  }
  return (
    <Form onSubmit={Submit} noValidate>
      <h1>Entrar</h1>
      <Form.Group>
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          onChange={onChangeUser}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha: </Form.Label>
        <Form.Control
          required
          type="password"
          value={password}
          onChange={onChangeUser}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {!!errors.other && <Alert variant="danger">{errors.other}</Alert>}
      <Form inline as="div" className="d-flex space-between">
        <Button type="submit" variant="outline-primary">
          Entrar
        </Button>
        <Link to="/resetpassword" className="float-right">Esqueci minha senha</Link>
      </Form>
    </Form>
  );
};
export default SingIn;

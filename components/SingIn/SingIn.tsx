import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";

const SingIn = () => {
  const {  closeLoginWindow } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        fire
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then((e) => {
            closeLoginWindow();
          })
          .catch((err) => {
            console.error(err);
          });
      }}
    >
      <Form.Group>
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SingIn;

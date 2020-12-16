import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../../config/fire";

const SingIn = () => {
  const router = useRouter();
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
            router.reload();
          })
          .catch((err) => {});
      }}
    >
      <Form.Group>
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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

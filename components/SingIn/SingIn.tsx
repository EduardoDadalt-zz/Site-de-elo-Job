import React, { useContext, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";

const SingIn = () => {
  const { closeLoginWindow } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!loading) {
          setLoading(true);
          fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((e) => {
              closeLoginWindow();
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        }
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
        <Button type="submit" variant="primary" className="btn-block" disabled={loading}>
          {loading ? <Spinner animation="border" /> : "Entrar"}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SingIn;

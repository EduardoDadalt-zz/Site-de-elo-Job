import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../../config/fire";

const SingUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  useEffect(() => {
    console.log("abcdefgh".includes(password));
  }, [password]);
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (secondPassword !== password) {
          fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((e) => {
              router.reload();
            })
            .catch((err) => {});
        }
      }}
    >
      <Form.Group>
        <Form.Label>E-mail:</Form.Label>
        <Form.Control
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
          isInvalid={!(password.length >= 6)}
          required
        />
        <Form.Control.Feedback type="invalid">
          A senha precisa ter:
          <ul>
            <li>Mais de 6 caracteres</li>
          </ul>
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirma a senha: </Form.Label>
        <Form.Control
          type="password"
          value={secondPassword}
          onChange={(e) => {
            setSecondPassword(e.target.value);
          }}
          required
          isValid={secondPassword === password}
          isInvalid={secondPassword !== password}
        />
        <Form.Control.Feedback type="invalid">
          Não as senhas não coincidem
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Button type="submit" variant="primary">
          Cadastrar-se
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SingUp;

import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";

const SingUp = () => {
  const router = useRouter();
  const { setUser } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          secondPassword === password &&
          password.length >= 6 &&
          password.search(/\W/g) === -1
        ) {
          fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((e) => {
              setUser(e.user);
            })
            .catch((err) => {});
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
          isInvalid={!(password.length >= 6 && password.search(/\W/g) === -1)}
          required
        />
        <Form.Control.Feedback type="invalid">
          A senha precisa ter:
          <li>Mais de 6 caracteres</li>
          <li>Só pode ter letras e números</li>
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

import { useRouter } from "next/router";
import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";

const SingUp = () => {
  const router = useRouter();
  const { setUser } = useContext(Auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    secondPassword: "",
    name: "",
    UserNameLol: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          form.secondPassword === form.password &&
          form.password.length >= 6 &&
          form.password.search(/\W/g) === -1
        ) {
          fire
            .auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then((e) => {
              setUser(e.user);
            })
            .catch((err) => {});
        }
      }}
    >
      <Form.Group>
        <Form.Label>Seu Nome</Form.Label>
        <Form.Control
          type="text"
          required
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Nick do LoL</Form.Label>
        <Form.Control
          type="text"
          required
          name="UserNameLol"
          value={form.UserNameLol}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          isInvalid={
            !(form.password.length >= 6 && form.password.search(/\W/g) === -1)
          }
          required
        />
        <Form.Control.Feedback type="invalid">
          A senha precisa ter:
          <li>Mais de 6 caracteres</li>
          <li>Só pode ter letras e números</li>
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirma a senha</Form.Label>
        <Form.Control
          type="password"
          name="secondPassword"
          value={form.secondPassword}
          onChange={handleChange}
          required
          isValid={form.secondPassword === form.password}
          isInvalid={form.secondPassword !== form.password}
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

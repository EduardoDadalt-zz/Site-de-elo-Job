import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import fire, { database } from "../../config/fire";
import InputPassword from "../InputPassword";
const SingUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    UsernameLol: "",
    PasswordLol: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    if (form.password.length >= 6 && form.password.search(/\W/g) === -1) {
      const { email, name, PasswordLol, UsernameLol, password } = form;
      fire
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (e) => {
          await database
            .ref("users/" + e.user.uid)
            .set({ PasswordLol, UsernameLol, name });
          let elojobRequest = {};
          for (const key in router.query) {
            try {
              elojobRequest[key] = JSON.parse(String(router.query[key]));
            } catch (error) {
              elojobRequest[key] = router.query[key];
            }
          }

          await database.ref("elojob/" + e.user.uid).set({ ...elojobRequest });
          router.push({ pathname: "/pedido" });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Seu Nome</Form.Label>
        <Form.Control
          type="text"
          required
          name="name"
          value={form.name}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Senha</Form.Label>
            <InputPassword
              name="password"
              value={form.password}
              onChange={onChange}
              isInvalid={
                !(
                  form.password.length >= 6 &&
                  form.password.search(/\W/g) === -1
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              A senha precisa ter:
              <li>Mais de 6 caracteres</li>
              <li>Só pode ter letras e números</li>
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label>Nick do LoL</Form.Label>
            <Form.Control
              type="text"
              required
              name="UsernameLol"
              value={form.UsernameLol}
              onChange={onChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Senha do LoL</Form.Label>
            <InputPassword
              name="PasswordLol"
              value={form.PasswordLol}
              onChange={onChange}
            />
            <Alert variant="warning">
              Sua senha será usada para o elo boost. Recomendamos que você mude
              sua senha antes{" "}
            </Alert>
          </Form.Group>
        </Col>
      </Form.Row>

      <Form.Group>
        <Button type="submit" variant="primary" style={{ width: "100%" }}>
          Confirmar
        </Button>
      </Form.Group>
    </Form>
  );
};

export default SingUp;

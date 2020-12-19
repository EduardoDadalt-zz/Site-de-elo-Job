import { useRouter } from "next/router";
import React, { ChangeEvent, memo, useContext, useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";
import Image from "next/image";
import InputPassword from "../InputPassword";
const SingUp = ({ form,onChange,onSubmit }) => {
  const router = useRouter();
  const { setUser } = useContext(Auth);
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
          </Form.Group>
        </Col>
      </Form.Row>

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

      <Form.Group>
        <Button type="submit" variant="primary" style={{ width: "100%" }}>
          Confirmar
        </Button>
      </Form.Group>
    </Form>
  );
};

export default memo(SingUp);

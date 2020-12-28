import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useContext, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";
import InputPassword from "../InputPassword";

const SingUp = ({ value }) => {
  const [logging, setLogging] = useState(false);
  const { cadastroOn, closeRegisterWindow } = useContext(Auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    UsernameLol: "",
    PasswordLol: "",
    whatsapp: "",
  });

  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, name, PasswordLol, UsernameLol, password, whatsapp } = form;
    setError("");
    if (
      password.length >= 6 &&
      password.search(/\W/g) === -1 &&
      whatsapp.slice().replace(/\D/g, "").length === 11
    ) {
      try {
        let { user } = await fire
          .auth()
          .createUserWithEmailAndPassword(email, password);
        user.updateProfile({ displayName: name });
        const token = await user.getIdToken();

        const obj = { value, token, PasswordLol, UsernameLol, name, whatsapp };

        await axios.post("/api/createElojob", obj);
        setLogging(true);
      } catch (e) {
        if (e.message) setError(e.message);
      }
    }
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Modal
      show={cadastroOn}
      onHide={(e) => {
        closeRegisterWindow();
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <h1>Cadastra-se</h1>
      </Modal.Header>
      <Modal.Body>
        {!logging ? (
          <Form onSubmit={onSubmit}>
            <Alert show={!!error} variant="danger">
              {error}
            </Alert>
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
                    required
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
              <Form.Label>Whatsapp: </Form.Label>
              <InputMask
                className={
                  "form-control " +
                  (form.whatsapp.slice().replace(/\D/g, "").length !== 11 &&
                    form.whatsapp.slice().replace(/\D/g, "").length > 0 &&
                    "is-invalid")
                }
                mask="(99) 99999-9999"
                name="whatsapp"
                value={form.whatsapp}
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
                    autoComplete="no"
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
                    required
                    autoComplete="no"
                  />
                  <Alert variant="warning">
                    Sua senha será usada para o elo boost. Recomendamos que você
                    mude sua senha antes{" "}
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
        ) : (
          <div
            className="w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <Image src="/icons/send.svg" height={200} width={200} />
            <span>Enviado com sucesso</span>
            <Link href="/pedido">
              <a>Ver o pedido</a>
            </Link>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SingUp;

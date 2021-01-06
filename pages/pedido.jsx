import React, { useContext } from "react";
import useSWR from "swr";
import { database } from "../config/fire";
import Image from "next/image";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Auth } from "../context/auth";
import SingIn from "../components/Login/SingIn";
import Head from "next/head";
import { getDataFromDatabase } from "../utils/getDataFromDatabase";
import CheckBoxs from "../components/CheckBox";
const Pedido = () => {
  const { user } = useContext(Auth);
  const { data, error } = useSWR(
    "elojob/" + (user && user.uid),
    getDataFromDatabase
  );
  if (!user) {
    return (
      <Container>
        <SingIn />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Alert variant="danger">Algo deu Errado :C</Alert>
      </Container>
    );
  }
  if (!data) {
    return (
      <Container className="center">
        <Spinner animation="border" />
      </Container>
    );
  }
  return (
    <div>
      <Head>
        <title>Meu pedido</title>
      </Head>
      <Container className="center">
        <h1>Status: {data && data.status && data.status}</h1>
      </Container>
      <Container>
        <Row>
          <Col>
            {data?.eloAtual?.img && (
              <Image
                width={512}
                height={585}
                layout="responsive"
                src={data.eloAtual.img}
              />
            )}
          </Col>
          <Col
            style={{ fontSize: "12vw" }}
            className="d-flex justify-content-center align-items-center"
          >
            <span>🚀</span>
          </Col>
          <Col>
            {data?.eloRequerido?.img && (
              <Image
                width={512}
                height={585}
                layout="responsive"
                src={data.eloRequerido.img}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <CheckBoxs options={data.options} onChange={() => {}} />
      </Container>
      <Container className="d-flex align-items-center justify-content-center">
        <h1>
          {data &&
            data.price &&
            Number(data.price).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
        </h1>
      </Container>
    </div>
  );
};

export default Pedido;

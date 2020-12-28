import React, { useContext } from "react";
import useSWR from "swr";
import { database } from "../config/fire";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Auth } from "../context/auth";
import SingIn from "../components/Login/SingIn";
import Head from "next/head";
import { getDataFromDatabase } from "../utils/getDataFromDatabase";
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
    return <div>Deu Erro...</div>;
  }
  if (!data) {
    return <Container>Carregando...</Container>;
  }
  return (
    <div>
      <Head>
        <title>Meu pedido</title>
      </Head>
      <Container>
        <Row>
          <Col>
            {data && data.eloAtual && data.eloAtual.img && (
              <Image
                width={512}
                height={585}
                layout="responsive"
                src={data.eloAtual.img}
              />
            )}
          </Col>
          <Col>{"=>"}</Col>
          <Col>
            {data && data.eloRequerido && data.eloRequerido.img && (
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
      <Container className="d-flex align-items-center justify-content-center">
        <div>
          {data &&
            data.price &&
            Number(data.price).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
        </div>
      </Container>
    </div>
  );
};

export default Pedido;

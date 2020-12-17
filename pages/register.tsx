import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SingUp from "../components/Login/SingUp";

const Register = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Cadastra-se</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Container>
        <Row>
          <Col>
            {router.query.eloAtual &&
              JSON.parse(String(router.query.eloAtual)).img && (
                <Image
                  height={512}
                  width={585}
                  layout="responsive"
                  src={JSON.parse(String(router.query.eloAtual)).img}
                  alt="Elo Atual"
                />
              )}
          </Col>
          <Col>
            {router.query.eloAtual &&
              JSON.parse(String(router.query.eloAtual)).img && (
                <Image
                  height={512}
                  width={585}
                  layout="responsive"
                  src={JSON.parse(String(router.query.eloAtual)).img}
                  alt="Elo Atual"
                />
              )}
          </Col>
        </Row>

        {/* <Image
          height={300}
          width={300}
          src={JSON.parse(router.query.eloRequerido).img || ""}
        /> */}
        <SingUp />
      </Container>
    </>
  );
};

export default Register;

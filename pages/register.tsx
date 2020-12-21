import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CheckBoxs from "../components/CheckBox";
import SingUp from "../components/SingUp";
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
      <Container style={{ maxWidth: "540px" }}>
        <Row
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col>
            {router.query.eloAtual &&
              JSON.parse(String(router.query.eloAtual)).img && (
                <Image
                  width={512}
                  height={585}
                  layout="responsive"
                  src={JSON.parse(String(router.query.eloAtual)).img}
                  alt="Elo Atual"
                />
              )}
          </Col>
          <Col
            style={{
              fontFamily: "'Fira Code'",
              fontWeight: 700,
              fontSize: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span>{"=>"}</span>
          </Col>
          <Col>
            {router.query.eloRequerido &&
              JSON.parse(String(router.query.eloRequerido)).img && (
                <Image
                  width={512}
                  height={585}
                  layout="responsive"
                  src={JSON.parse(String(router.query.eloRequerido)).img}
                  alt="Elo Requerido"
                />
              )}
          </Col>
        </Row>

        <Row>
          <Col>
            {router.query.options && (
              <CheckBoxs
                options={JSON.parse(String(router.query.options))}
                onChange={() => {}}
              />
            )}
          </Col>
        </Row>
        <Row>
          {router.query.preco && (
            <Col
              style={{
                fontSize: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                {Number(router.query.preco).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </Col>
          )}
        </Row>
      </Container>
      <Container>
        <SingUp />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (JSON.stringify(context.query) === JSON.stringify({})) {
    return {
      redirect: {
        destination: "/elojob?modalidade=1",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
export default Register;

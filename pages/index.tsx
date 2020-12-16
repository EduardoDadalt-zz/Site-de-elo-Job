import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/home.module.css";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <Head>
        <title>Galaxy Job🚀</title>
      </Head>
      <section className={styles.section}>
        <Row className="w-100 h-100">
          <Col className="w-100 h-100" md={5}>
            Image buscando ...
          </Col>
          <Col md={6} className="d-flex align-items-center w-100 h-100">
            <h1> Melhore seu Elo</h1>
          </Col>
        </Row>
      </section>
      <section className={styles.section}>
        <Container>
          <h1>Home</h1>
        </Container>
      </section>
    </>
  );
}

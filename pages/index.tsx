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
        <Container className="w-100 h-100">
          <Row className="w-100 h-100">
            <Col>Buscando Imagem</Col>
            <Col>De um boost no seu Elo</Col>
          </Row>
        </Container>
      </section>
      <section className={styles.section}>
        <Container>
          <h1>Home</h1>
        </Container>
      </section>
    </>
  );
}

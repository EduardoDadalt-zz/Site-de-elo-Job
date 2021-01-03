import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Col, Container, Jumbotron, Row } from "react-bootstrap";
import styles from "../styles/home.module.css";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Galaxy Job🚀</title>
      </Head>
      <section className={styles.section + " " + styles.backgroundSpace}>
        <Container className="w-100 h-100">
          <Row className="w-100 h-100 text-light">
            <Col>
              <Image
                src="/teste.gif"
                layout="fill"
                className={styles.rocketImg}
              />
            </Col>
            <Col>Turbine seu elo</Col>
          </Row>
        </Container>
      </section>
      <section className={styles.section}>
        <Jumbotron>
          <Container>
            <h1>Encomenda agora seu elo job</h1>
            <p>A equipe mais confiavel de elo job do Brasil</p>
            <p>
              <Button
                onClick={() => {
                  router.push("/elojob");
                }}
              >
                Peça já
              </Button>
            </p>
          </Container>
        </Jumbotron>
      </section>
    </>
  );
}

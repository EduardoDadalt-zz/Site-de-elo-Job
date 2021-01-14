import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Card, CardDeck, Col, Container, Row } from "react-bootstrap";
import styles from "../styles/home.module.css";
export default function Home() {
  return (
    <>
      <Head>
        <title>Galaxy Job🚀</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <section
        className={
          styles.section + " position-relative " + styles.backgroundSpace
        }
      >
        <img
          src="/bg.gif"
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
            width: "100%",
            height: "100%",
          }}
        />
        <Row className="w-100 h-100 position-relative text-white">
          <Col></Col>
          <Col
            sm={4}
            className="d-flex justify-content-center align-items-center"
          >
            <h1
              style={{ fontFamily: "Roboto", textShadow: "1px 1px 1px black" }}
              className="font-weight-bold"
            >
              Turbine seu Elo
            </h1>
          </Col>
        </Row>
      </section>
      <section>
        <Container fluid="xl" className="my-2">
          <CardDeck>
            {[
              {
                title: "Elo Boost",
                text: "Subiremos seu Elo",
                src: "/icons/user.svg",
              },
              {
                title: "Duo Boost",
                text: "Um membro da nossa equipe ajudaram você a subir de Elo",
                src: "/icons/users.svg",
              },
              {
                title: "Vitórias Avulsas",
                text: "Ganharemos partidas para você",
                src: "/icons/chevrons-up.svg",
              },
            ].map((e, x) => (
              <CardPlan card={{ ...e, index: x }} />
            ))}
          </CardDeck>
        </Container>
      </section>
    </>
  );
}

const CardPlan = ({ card }) => {
  const router = useRouter();
  return (
    <Card>
      <Card.Header>
        <h4 className="text-center font-weight-bold">{card.title}</h4>
      </Card.Header>
      <Card.Img
        as={Image}
        src={card.src}
        height={100}
        width={100}
        variant="top"
      />
      <Card.Body>
        <Card.Text>{card.text}</Card.Text>
        <Button
          onClick={() => {
            router.push("/elojob?modalidade=" + (card.index + 1));
          }}
          className="btn-block"
          variant="primary"
        >
          Peça já
        </Button>
      </Card.Body>
    </Card>
  );
};

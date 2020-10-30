import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardDeck,
  Container,
  Row,
} from "react-bootstrap";
import bronzeImg from "../../assets/elo/Emblem_Bronze.png";
import diamondImg from "../../assets/elo/Emblem_Diamond.png";
import goldImg from "../../assets/elo/Emblem_Gold.png";
import ironImg from "../../assets/elo/Emblem_Iron.png";
import masterImg from "../../assets/elo/Emblem_Master.png";
import platinumImg from "../../assets/elo/Emblem_Platinum.png";
import silverImg from "../../assets/elo/Emblem_Silver.png";
import "./styles.css";

function EloSelect(props) {
  var elos = [
    {
      title: "Ferro",
      img: ironImg,
    },
    {
      title: "Bronze",
      img: bronzeImg,
    },
    {
      title: "Prata",
      img: silverImg,
    },
    {
      title: "Ouro",
      img: goldImg,
    },
    {
      title: "Platina",
      img: platinumImg,
    },
    {
      title: "Diamante",
      img: diamondImg,
    },
  ];
  if (props.reverse) {
    elos.reverse();
  }
  return (
    <div
      className="BackgroundBlack"
      onClick={() => {
        props.close();
      }}
    >
      <Container>
        <CardDeck>
          {props.highElo && props.reverse && <MasterCard value={props.value} />}
          {elos.map((v) => {
            return (
              <Card key={"Card:" + v.title} border="dark">
                <Card.Img src={v.img}></Card.Img>
                <Card.Body>
                  <Card.Title>{v.title}</Card.Title>
                  <Card.Text>Tiers:</Card.Text>
                  <Row style={{ display: "flex" }}>
                    {(() => {
                      let g = [];
                      for (let x = 4; x > 0; x--) {
                        g.push(
                          <Button
                            variant="outline-dark"
                            key={
                              "Button:" +
                              JSON.stringify({ elo: v.title, tier: x })
                            }
                            onClick={() => {
                              props.value({
                                elo: v.title,
                                tier: x,
                                img: v.img,
                              });
                            }}
                          >
                            {x}
                          </Button>
                        );
                      }
                      return <ButtonGroup>{g}</ButtonGroup>;
                    })()}
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
          {props.highElo && !props.reverse && (
            <MasterCard value={props.value} />
          )}
        </CardDeck>
      </Container>
    </div>
  );
}

function MasterCard(props) {
  return (
    <Card border="dark">
      <Card.Img src={masterImg}></Card.Img>
      <Card.Body>
        <Card.Title>Mestre</Card.Title>
        <Button
          onClick={() => {
            props.value({ elo: "Mestre", tier: "", img: masterImg });
          }}
        >
          Mestre
        </Button>
      </Card.Body>
    </Card>
  );
}
export default EloSelect;

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
import masterImg from "../../assets/elo/Emblem_Master.png";

import "./styles.css";

function EloSelect({ elos, ...props }) {
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
                        if (
                          !(
                            props.atDiamantFour === true &&
                            x < 4 &&
                            v.title === "Diamante"
                          )
                        ) {
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

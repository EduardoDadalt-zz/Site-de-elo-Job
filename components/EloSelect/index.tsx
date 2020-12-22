import Image from "next/image";
import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import styles from "./styles.module.css";

function EloSelect({ elos, ...props }) {
  return (
    <div className={styles.grid}>
      {props.highElo && props.reverse && (
        <MasterCard
          elo={elos[elos.length - 1].elo}
          img={elos[elos.length - 1].img}
          value={props.value}
        />
      )}
      {(props.reverse ? elos.slice().reverse() : elos.slice())
        .filter((f) => f.tier === 1)
        .map(({ img, elo }) => {
          return (
            <Card key={"Card:" + elo} border="dark" className={styles.card}>
              <Card.Img
                as={Image}
                src={img}
                height="150px"
                width="150px"
                className={styles.image}
              ></Card.Img>
              <Card.Body className={styles.center}>
                <Card.Title>{elo}</Card.Title>
                <Card.Text>Tiers:</Card.Text>
                {(() => {
                  let g = [];
                  for (let x = 4; x > 0; x--) {
                    if (
                      !(
                        props.atDiamantFour === true &&
                        x < 4 &&
                        elo === "Diamante"
                      )
                    ) {
                      g.push(
                        <Button
                          variant="outline-dark"
                          key={"Button:" + JSON.stringify({ elo, tier: x })}
                          onClick={() => {
                            props.value({
                              elo,
                              tier: x,
                              img,
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
              </Card.Body>
            </Card>
          );
        })}
    </div>
  );
}
function MasterCard({ elo, img, value }) {
  return (
    <Card border="dark" className={styles.card} style={{ height: 306 }}>
      <Card.Img
        as={Image}
        src={img}
        height="150px"
        width="150px"
        className={styles.image}
      ></Card.Img>
      <Card.Body className={styles.center}>
        <Card.Title>Mestre</Card.Title>
        <Button
          onClick={() => {
            value({ elo, tier: "", img });
          }}
        >
          Mestre
        </Button>
      </Card.Body>
    </Card>
  );
}
export default EloSelect;

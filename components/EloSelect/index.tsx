import Image from "next/image";
import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import styles from "./styles.module.css";
const masterImg = "/elo/Emblem_Master.png";

function EloSelect({ elos, ...props }) {
  if (props.reverse) {
    elos.reverse();
  }
  return (
    <div className={styles.grid}>
      {props.highElo && props.reverse && <MasterCard value={props.value} />}
      {elos.map((v) => {
        return (
          <Card key={"Card:" + v.title} border="dark" className={styles.card}>
            <Card.Img
              as={Image}
              src={v.img}
              height="150px"
              width="150px"
              className={styles.image}
            ></Card.Img>
            <Card.Body className={styles.center}>
              <Card.Title>{v.title}</Card.Title>
              <Card.Text>Tiers:</Card.Text>
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
                          "Button:" + JSON.stringify({ elo: v.title, tier: x })
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
            </Card.Body>
          </Card>
        );
      })}
      {props.highElo && !props.reverse && <MasterCard value={props.value} />}
    </div>
  );
}

function MasterCard(props) {
  return (
    <Card border="dark" className={styles.card}>
      <Card.Img
        as={Image}
        src={masterImg}
        height="150px"
        width="150px"
        className={styles.image}
      ></Card.Img>
      <Card.Body className={styles.center}>
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

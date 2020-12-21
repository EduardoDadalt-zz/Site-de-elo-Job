import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { database } from "../config/fire";
import { Auth } from "../context/auth";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import CheckBoxs from "../components/CheckBox";
import { eloETier } from "../config/eloETier";
import { getPrice } from "../config/getPrice";
import Elojob from "../interface/elojob";
const getValueDatabase = async (url) => {
  let data = await database
    .ref(url)
    .once("value", (snapshot) => snapshot.val());

  let obj = data.toJSON();

  return obj;
};

const Pedido = () => {
  const { user } = useContext(Auth);
  const [preco, setPreco] = useState(0);
  const { data, error } = useSWR(
    "/elojob/" + (!!user && user.uid),
    getValueDatabase
  );
  useEffect(() => {
    return setPreco(getPrice({ ...data }));
  }, [data]);
  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <Row
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col>
            <Image
              width={512}
              height={585}
              layout="responsive"
              src={data.eloAtual && data.eloAtual.img}
              alt="Elo Atual"
            />
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
            <Image
              width={512}
              height={585}
              layout="responsive"
              src={data.eloRequerido.img}
              alt="Elo Requerido"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CheckBoxs options={data.options} onChange={() => {}} />
          </Col>
        </Row>
        <Row>
          <Col>{preco}</Col>
        </Row>
        {JSON.stringify(data)}
      </Container>
    </div>
  );
};

export default Pedido;

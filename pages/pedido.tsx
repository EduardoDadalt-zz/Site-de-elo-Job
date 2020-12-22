import React from "react";
import useSWR from "swr";
import fire, { database } from "../config/fire";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
const getDataFromDatabase = async (url) => {
  return (await database.ref(url).once("value", (e) => e.val())).toJSON();
};

const Pedido = () => {
  const { data, error } = useSWR(
    "/elojob" + fire.auth().currentUser.uid,
    getDataFromDatabase
  );
  if (error) {
    return <div>Deu Erro...</div>;
  }
  if (!data) {
    return <div>Carregando...</div>;
  }
  return (
    <div>
      <Row>
        <Col>
          {data && data.eloAtual && data.eloAtual.img && (
            <Image
              width={512}
              height={585}
              layout="responsive"
              src={data.eloAtual.img}
            />
          )}
        </Col>
        <Col>
          {data && data.eloRequerido && data.eloRequerido.img && (
            <Image
              width={512}
              height={585}
              layout="responsive"
              src={data.eloRequerido.img}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Pedido;

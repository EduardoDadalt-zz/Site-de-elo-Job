import React, { useContext } from "react";
import useSWR from "swr";
import fire, { database } from "../config/fire";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { Auth } from "../context/auth";
import SingIn from "../components/Login/SingIn";
const getDataFromDatabase = async (url) => {
  return (await database.ref(url).once("value", (e) => e.val())).toJSON();
};

const Pedido = () => {
  const {user} = useContext(Auth)
  const { data, error } = useSWR(
    "/elojob" + (user&&user.uid),
    getDataFromDatabase
  );
  if(!user){
    return <Container>
      <SingIn/>
    </Container>
  }
  if (error) {
    return <div>Deu Erro...</div>;
  }
  if (!data) {
    return <Container>Carregando...</Container>;
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

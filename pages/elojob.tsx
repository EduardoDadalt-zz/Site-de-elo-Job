/* eslint-disable eqeqeq */
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import FBAdmin from "../admin/admin";
import CheckBoxs from "../components/CheckBox";
import EloSelect from "../components/EloSelect";
import SingUp from "../components/SingUp";
import { eloETier } from "../config/eloETier";
import { getPrice } from "../config/getPrice";
import { Auth } from "../context/auth";
import styles from "../styles/elojob.module.css";

function Elojob({ precoPorTierDuoBoost, precoPorTier, champions }) {
  //#region Variables
  const fraseInicialEloAtual = "Selecione seu Elo",
    fraseInicialEloRequerido = "Selecione o Elo do Sonho";
  const { openLoginWindow, openRegisterWindow } = useContext(Auth);
  const router = useRouter();

  const [preco, setPreco] = useState(0);
  const [partidasAvulsas, setPartidasAvulsas] = useState(1);
  const [eloAtual, setEloAtual] = useState({
    elo: fraseInicialEloAtual,
    tier: "",
    img: undefined,
  });
  const [modalidade, setModalidade] = useState<number | string>("");
  const [filaRanqueada, setFilaRanqueada] = useState("");
  const [eloAtualSelectWindow, setEloAtualSelectWindow] = useState(false);
  const [eloRequerido, setEloRequerido] = useState({
    elo: fraseInicialEloRequerido,
    tier: "",
    img: undefined,
  });

  const [eloRequeridoSelectWindow, setEloRequeridoSelectWindow] = useState(
    false
  );
  const [options, setOptions] = useState<{ [index: string]: boolean | string }>(
    {
      Bugou: false,
    }
  );
  //#endregion
  useEffect(() => {
    let modal = Array.isArray(router.query.modalidade)
      ? router.query.modalidade[0]
      : router.query.modalidade;
    setModalidade(modal);
  }, [router.query.modalidade]);
  useEffect(() => {
    if (modalidade == 1 || modalidade == 3)
      setOptions({
        "Tecla do Flash (Grátis)": true,
        "Chat Offline (Grátis)": true,
        "Selecionar a Rota (+20%)": false,
        "Selecionar o Campeão (+20%)": false,
        "Definir os Horários (+10%)": false,
        "Estou recebendo menos de 15 de PDL (+40%)": false,
      });
    if (modalidade == 2) {
      if (
        eloETier
          .slice(0, -4)
          .every(
            (v) => v.elo != eloRequerido.elo && v.tier != eloRequerido.tier
          )
      ) {
        setEloRequerido({
          elo: fraseInicialEloRequerido,
          tier: "",
          img: undefined,
        });
      }
      setOptions({
        "Jogar Com o Duo": "disabled",
        "Selecionar o Horário": true,
        "Estou recebendo menos de 15 de PDL (+40%)": false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalidade]);
  useEffect(() => {
    let price = getPrice({
      eloAtual,
      modalidade,
      eloRequerido,
      options,
      precoPorTier,
      precoPorTierDuoBoost,
      partidasAvulsas,
    });
    setPreco(price);
  }, [modalidade, eloAtual, eloRequerido, partidasAvulsas, options]);
  return (
    <>
      <Head>
        <title>Mande seu EloJob</title>
      </Head>
      <SingUp
        value={{
          modalidade,
          eloAtual,
          filaRanqueada,
          eloRequerido,
          partidasAvulsas,
          options,
          champions,
        }}
      />

      <Modal
        show={eloAtualSelectWindow}
        onHide={() => {
          setEloAtualSelectWindow(false);
        }}
        contentClassName={styles.transparent}
        dialogClassName={styles.dialog}
      >
        <EloSelect
          elos={eloETier}
          value={(value) => {
            setEloAtual(value);
            setEloAtualSelectWindow(false);
          }}
        />
      </Modal>
      <Modal
        show={eloRequeridoSelectWindow}
        onHide={() => {
          setEloRequeridoSelectWindow(false);
        }}
        contentClassName={styles.transparent}
        dialogClassName={styles.dialog}
      >
        <EloSelect
          elos={eloETier}
          value={(value) => {
            setEloRequerido(value);
            setEloRequeridoSelectWindow(false);
          }}
          highElo={modalidade != 2}
          atDiamantFour={modalidade == 2}
          reverse
        />
      </Modal>
      <div>
        <Container fluid="xl">
          <Form>
            <Row className="justify-content-around">
              <Col
                md={5}
                className={
                  "text-white border border-dark rounded " + styles.col
                }
                style={{ backgroundColor: "var(--blue)" }}
              >
                <Form.Group>
                  <Form.Label>Coloque Seu Elo Atual</Form.Label>
                  <div
                    className={
                      "form-control " + styles.formImg + " btn btn-light"
                    }
                    onClick={() => {
                      setEloAtualSelectWindow(true);
                    }}
                  >
                    {eloAtual.img && (
                      <img
                        className={styles.img}
                        src={eloAtual.img && eloAtual.img}
                        alt={eloAtual.elo + " Imagem"}
                        height="100%"
                        width="min-width"
                      />
                    )}

                    {eloAtual.elo + " " + eloAtual.tier}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Selecione a Sua fila ranqueda</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={(e) => {
                      setFilaRanqueada(e.target.value);
                    }}
                    value={filaRanqueada}
                    isInvalid={filaRanqueada === ""}
                  >
                    <option value="" disabled hidden>
                      Selecione a fila Ranqueada:
                    </option>
                    {["Solo/Duo", "Flex"].map((v, x) => {
                      return (
                        <option value={v.toLowerCase()} key={v.toLowerCase()}>
                          {v}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Qual a Modalidade</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    onChange={(e) => {
                      setModalidade(e.target.value);
                    }}
                    value={modalidade}
                  >
                    <option value="" disabled hidden>
                      Selecione a modalidade:{" "}
                    </option>
                    {["EloBoost", "DuoBoost", "Vitórias Avulsas"].map(
                      (v, x) => {
                        return (
                          <option value={x + 1} key={x + 1}>
                            {v}
                          </option>
                        );
                      }
                    )}
                  </Form.Control>
                </Form.Group>
              </Col>
              {modalidade > 0 && modalidade < 4 && (
                <Col
                  md={1}
                  style={{
                    fontSize: "4em",
                  }}
                  className="d-flex justify-content-center"
                >
                  <span style={{ textShadow: "1px 1px 1px black" }}>🚀</span>
                </Col>
              )}

              {modalidade > 0 && modalidade < 3 && (
                <Col
                  md={5}
                  className={
                    styles.col + " border border-dark rounded text-white "
                  }
                  style={{ backgroundColor: "var(--indigo)" }}
                >
                  <Form.Group>
                    <Form.Label>Elo dos Sonhos</Form.Label>
                    <div
                      className={
                        "form-control " + styles.formImg + " btn btn-light"
                      }
                      onClick={() => {
                        setEloRequeridoSelectWindow(true);
                      }}
                    >
                      {eloRequerido.img && (
                        <img
                          className={styles.img}
                          src={eloRequerido.img}
                          height="100%"
                          width="min-width"
                          alt={eloRequerido.elo + " Imagem"}
                        />
                      )}

                      {eloRequerido.elo + " " + eloRequerido.tier}
                    </div>
                  </Form.Group>
                  <CheckBoxs
                    options={options}
                    onChange={(key, value) => {
                      setOptions({
                        ...options,
                        [key]: value,
                      });
                    }}
                  />
                </Col>
              )}

              {modalidade == 3 && (
                <Col
                  md={5}
                  className={
                    styles.col + " border border-dark rounded text-white"
                  }
                  style={{ backgroundColor: "var(--indigo)" }}
                >
                  <Form.Group>
                    <Form.Label> Quantas partidas? </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      max={20}
                      min={1}
                      value={partidasAvulsas}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (value > 20) {
                          value = 20;
                        }
                        if (value < 0) {
                          value = 0;
                        }
                        value = Math.floor(value);
                        setPartidasAvulsas(value);
                      }}
                      placeholder="1"
                    ></Form.Control>
                  </Form.Group>
                  <CheckBoxs
                    options={options}
                    onChange={(key, value) => {
                      setOptions({
                        ...options,
                        [key]: value,
                      });
                    }}
                  />
                </Col>
              )}
            </Row>
            <Row style={{ alignItems: "center" }}>
              <Col className={styles.col}>
                <h1>
                  {preco.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </h1>
              </Col>
              <Col className={styles.col}>
                <Button
                  className="btn-block"
                  variant="success"
                  onClick={() => {
                    let eloAtualIndex = eloETier.findIndex(
                      (f) => f.elo == eloAtual.elo && f.tier == eloAtual.tier
                    );
                    let eloRequeridoIndex;
                    if (!!eloRequerido) {
                      eloRequeridoIndex = eloETier.findIndex(
                        (f) =>
                          f.elo == eloRequerido.elo &&
                          f.tier == eloRequerido.tier
                      );
                    }
                    if (
                      modalidade > 0 &&
                      modalidade < 4 &&
                      !!eloAtual &&
                      !!filaRanqueada &&
                      eloAtualIndex !== -1 &&
                      ((eloRequeridoIndex !== -1 &&
                        !!eloRequerido &&
                        eloAtualIndex < eloRequeridoIndex) ||
                        partidasAvulsas)
                    ) {
                      openRegisterWindow();
                    }
                  }}
                >
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const promisePrecoPorTier = FBAdmin.database()
    .ref("precoPorTier")
    .once("value", (v) => v.val())
    .then((e) => e.toJSON());

  const promisePrecoPorTierDuoBoost = FBAdmin.database()
    .ref("precoPorTierDuoBoost")
    .once("value", (v) => v.val())
    .then((e) => e.toJSON());

  const promiseChampions = fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((array) =>
      fetch(
        "http://ddragon.leagueoflegends.com/cdn/" +
          array[0] +
          "/data/pt_BR/champion.json",
        { method: "GET" }
      )
    )
    .then((e) => e.json())
    .then((championList) => {
      let arr = [];
      for (const key in championList.data) {
        arr.push(championList.data[key].name);
      }
      return arr.sort();
    });

  const array = await Promise.all([
    promisePrecoPorTier,
    promisePrecoPorTierDuoBoost,
    promiseChampions,
  ]);

  return {
    props: {
      precoPorTier: array[0],
      precoPorTierDuoBoost: array[1],
      champions: array[2],
    },
    revalidate: 86400,
  };
};
export default Elojob;

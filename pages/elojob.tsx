/* eslint-disable eqeqeq */
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import CheckBoxs from "../components/CheckBox";
import EloSelect from "../components/EloSelect";
import SingUp from "../components/SingUp";
import { eloETier } from "../config/eloETier";
import fire from "../config/fire";
import { getPrice } from "../config/getPrice";
import { Auth } from "../context/auth";
import styles from "../styles/elojob.module.css";

function Elojob({ precoPorTierDuoBoost, precoPorTier }) {
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
      <div
        className={styles.center}
        style={{ minHeight: "calc(100vh - 66px)" }}
      >
        <Container>
          <Form>
            <Row>
              <Col
                sm
                className={
                  "bg-info text-white border border-dark rounded " + styles.col
                }
              >
                <Form.Group>
                  <Form.Label>Coloque Seu Elo Atual</Form.Label>
                  <div
                    className={"form-control " + styles.formImg}
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
              <Col
                sm
                className={
                  styles.col +
                  " bg-success border border-dark rounded text-white " +
                  (modalidade === "" && styles.disable)
                }
              >
                {modalidade > 0 && modalidade < 3 && (
                  <>
                    <Form.Group>
                      <Form.Label>Elo dos Sonhos</Form.Label>
                      <div
                        className={"form-control " + styles.formImg}
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
                  </>
                )}

                {modalidade == 3 && (
                  <>
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
                  </>
                )}
              </Col>
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
                  style={{ width: "100%" }}
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
                      modalidade < 3 &&
                      !!eloAtual &&
                      !!eloRequerido &&
                      !!filaRanqueada &&
                      eloAtualIndex !== -1 &&
                      eloRequeridoIndex !== -1 &&
                      eloAtualIndex < eloRequeridoIndex
                    ) {
                      openRegisterWindow();
                    } else if (modalidade === 3) {
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
  const precoPorTier = (
    await fire
      .database()
      .ref("precoPorTier")
      .once("value", (v) => v.val())
  ).toJSON();
  const precoPorTierDuoBoost = (
    await fire
      .database()
      .ref("precoPorTierDuoBoost")
      .once("value", (v) => v.val())
  ).toJSON();
  return {
    props: {
      precoPorTierDuoBoost,
      precoPorTier,
    },
    redirect: 86400,
  };
};
export default Elojob;

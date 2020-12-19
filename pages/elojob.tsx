/* eslint-disable eqeqeq */
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import EloSelect from "../components/EloSelect";
import { eloETier } from "../config/eloETier";
import { Auth } from "../context/auth";
import styles from "../styles/elojob.module.css";
import CheckBoxs from "../components/CheckBox";
const bronzeImg = "/elo/Emblem_Bronze.png";
const diamondImg = "/elo/Emblem_Diamond.png";
const goldImg = "/elo/Emblem_Gold.png";
const ironImg = "/elo/Emblem_Iron.png";
const platinumImg = "/elo/Emblem_Platinum.png";
const silverImg = "/elo/Emblem_Silver.png";
const precoPorTier = {
  ferro: 10,
  bronze: 15,
  prata: 20,
  ouro: 25,
  platina: 35,
  diamante: { 4: 70, 3: 80, 2: 90, 1: 100 },
};

const precoPorTierDuoBoost = {
  ferro: 15,
  bronze: 20,
  prata: 30,
  ouro: 40,
  platina: 50,
};

function Elojob(props) {
  const { isLoggin, openLoginWindow, setCadastroOn } = useContext(Auth);
  const router = useRouter();
  const elos = [
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
  const [preco, setPreco] = useState(0);
  const [partidasAvulsas, setPartidasAvulsas] = useState(1);
  const fraseInicialEloAtual = "Selecione seu Elo",
    fraseInicialEloRequerido = "Selecione o Elo do Sonho";
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
    let preco2 = 0;
    if (eloAtual.elo !== fraseInicialEloAtual) {
      const eloAtualIndex = eloETier.findIndex(
        (f) => f.elo == eloAtual.elo && f.tier == eloAtual.tier
      );

      if (eloRequerido.elo !== fraseInicialEloRequerido) {
        const eloRequeridoIndex = eloETier.findIndex(
          (f) => f.elo == eloRequerido.elo && f.tier == eloRequerido.tier
        );

        if (modalidade == 1) {
          for (let x = eloAtualIndex; x < eloRequeridoIndex; x++) {
            let partidas = 7.5;
            let multipli = SelecionarPorElo(eloETier[x], precoPorTier);

            if (eloETier[x].tier == 1) {
              partidas += 1;
            }
            multipli /= partidas;
            preco2 += partidas * multipli;
          }
        }
        if (modalidade == 2) {
          for (let x = eloAtualIndex; x < eloRequeridoIndex; x++) {
            let partidas = 7.5;
            let multipli = SelecionarPorElo(eloETier[x], precoPorTierDuoBoost);

            if (eloETier[x].tier == 1) {
              partidas += 1;
            }
            multipli /= partidas;
            preco2 += partidas * multipli;
          }
        }
      }

      if (modalidade == 3) {
        let multipli = SelecionarPorElo(eloETier[eloAtualIndex], precoPorTier);
        preco2 = partidasAvulsas * (multipli / 4);
      }
    }

    if (options["Selecionar a Rota (+20%)"]) {
      preco2 *= 1.2;
    }
    if (options["Selecionar o Campeão (+20%)"]) {
      preco2 *= 1.2;
    }
    if (options["Definir os Horários (+10%)"]) {
      preco2 *= 1.1;
    }
    if (options["Estou recebendo menos de 15 de PDL (+40%)"]) {
      preco2 *= 1.4;
    }
    setPreco(Math.ceil(preco2));
  }, [modalidade, eloAtual, eloRequerido, partidasAvulsas, options]);
  return (
    <>
      <Head>
        <title>Mande seu EloJob</title>
      </Head>
      <Modal
        show={eloAtualSelectWindow}
        onHide={() => {
          setEloAtualSelectWindow(false);
        }}
        contentClassName={styles.transparent}
        dialogClassName={styles.dialog}
      >
        <EloSelect
          elos={elos}
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
          elos={elos}
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
                    {["EloBoost", "DuoBoost", "Vitorias Avulsas"].map(
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
                    console.log({ filaRanqueada: !!filaRanqueada });

                    console.log({ eloAtualIndex });

                    console.log({ eloRequeridoIndex });

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
                      router.push({
                        pathname: "/register",
                        query: {
                          modalidade,
                          eloAtual: JSON.stringify(eloAtual),
                          eloRequerido: JSON.stringify(eloRequerido),
                          filaRanqueada,
                          options: JSON.stringify(options),
                          preco,
                        },
                      });
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
function SelecionarPorElo(eloetier, elos) {
  let result;
  switch (eloetier.elo) {
    case "Ferro":
      result = elos.ferro;
      break;
    case "Bronze":
      result = elos.bronze;
      break;
    case "Prata":
      result = elos.prata;
      break;
    case "Ouro":
      result = elos.ouro;
      break;
    case "Platina":
      result = elos.platina;
      break;
    case "Diamante":
      if (elos.diamante)
        switch (eloetier.tier) {
          case 4:
            result = elos.diamante[4];
            break;
          case 3:
            result = elos.diamante[3];
            break;
          case 2:
            result = elos.diamante[2];
            break;
          case 1:
            result = elos.diamante[1];
            break;
          default:
            break;
        }
      break;
    default:
      result = 1;
      break;
  }
  return result;
}

export default Elojob;

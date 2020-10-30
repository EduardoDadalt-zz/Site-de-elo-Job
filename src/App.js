/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./App.css";
import EloSelect from "./components/EloSelect";

var eloETier = [
  { elo: "Ferro", tier: 4 },
  { elo: "Ferro", tier: 3 },
  { elo: "Ferro", tier: 2 },
  { elo: "Ferro", tier: 1 },
  { elo: "Bronze", tier: 4 },
  { elo: "Bronze", tier: 3 },
  { elo: "Bronze", tier: 2 },
  { elo: "Bronze", tier: 1 },
  { elo: "Prata", tier: 4 },
  { elo: "Prata", tier: 3 },
  { elo: "Prata", tier: 2 },
  { elo: "Prata", tier: 1 },
  { elo: "Ouro", tier: 4 },
  { elo: "Ouro", tier: 3 },
  { elo: "Ouro", tier: 2 },
  { elo: "Ouro", tier: 1 },
  { elo: "Platina", tier: 4 },
  { elo: "Platina", tier: 3 },
  { elo: "Platina", tier: 2 },
  { elo: "Platina", tier: 1 },
  { elo: "Diamante", tier: 4 },
  { elo: "Diamante", tier: 3 },
  { elo: "Diamante", tier: 2 },
  { elo: "Diamante", tier: 1 },
  { elo: "Mestre", tier: "" },
];
const precoPorTier = {
  ferro: 10,
  bronze: 15,
  prata: 20,
  ouro: 25,
  platina: 35,
  diamante: { 4: 70, 3: 80, 2: 90, 1: 100 },
};
function SelecionarPorElo(eloetier) {
  let result;
  switch (eloetier.elo) {
    case "Ferro":
      result = precoPorTier.ferro;
      break;
    case "Bronze":
      result = precoPorTier.bronze;
      break;
    case "Prata":
      result = precoPorTier.prata;
      break;
    case "Ouro":
      result = precoPorTier.ouro;
      break;
    case "Platina":
      result = precoPorTier.platina;
      break;
    case "Diamante":
      switch (eloetier.tier) {
        case 4:
          result = precoPorTier.diamante[4];
          break;
        case 3:
          result = precoPorTier.diamante[3];
          break;
        case 2:
          result = precoPorTier.diamante[2];
          break;
        case 1:
          result = precoPorTier.diamante[1];
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
function App() {
  const [preco, setPreco] = useState(0);
  const [partidasAvulsas, setPartidasAvulsas] = useState(1);
  const fraseInicialEloAtual = "Selecione seu Elo",
    fraseInicialEloRequerido = "Selecione o Elo do Sonho";
  const [eloAtual, setEloAtual] = useState({
    elo: fraseInicialEloAtual,
    tier: "",
  });
  const [modalidade, setModalidade] = useState("");
  const [filaRanqueada, setFilaRanqueada] = useState(0);
  const [eloAtualSelectWindow, setEloAtualSelectWindow] = useState(false);
  const [eloRequerido, setEloRequerido] = useState({
    elo: fraseInicialEloRequerido,
    tier: "",
  });

  const [eloRequeridoSelectWindow, setEloRequeridoSelectWindow] = useState(
    false
  );
  const [options, setOptions] = useState({
    Bugou: false,
  });
  useEffect(() => {
    if (modalidade == 1 || modalidade == 3)
      setOptions({
        "Tecla do Flash (Grátis)": true,
        "Chat Offline (Grátis)": true,
        "Selecionar a Rota (+20%)": false,
        "Selecionar o Campeão (+20%)": false,
        "Definir os Horários (+10%)": false,
      });
    if (modalidade == 2) {
      setOptions({
        "Jogar Com o Duo": "disabled",
        "Selecionar o Horário": true,
      });
    }
  }, [modalidade]);
  useEffect(() => {
    console.log(eloRequerido);
  }, [eloRequerido]);
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
          //let partidas;

          for (let x = eloAtualIndex; x < eloRequeridoIndex; x++) {
            let partidas = 7.5;
            let multipli = SelecionarPorElo(eloETier[x]);

            if (eloETier[x].tier == 1) {
              partidas += 1;
            }
            multipli /= partidas;
            preco2 += partidas * multipli;
          }
        }
        if (modalidade == 2) {
        }
      }

      if (modalidade == 3) {
        let multipli = SelecionarPorElo(eloETier[eloAtualIndex]);
        preco2 = partidasAvulsas * (multipli / 4);
      }
    }

    setPreco(Math.ceil(preco2));
  }, [modalidade, eloAtual, eloRequerido, partidasAvulsas]);
  return (
    <>
      {eloAtualSelectWindow && (
        <EloSelect
          close={() => {
            setEloAtualSelectWindow(false);
          }}
          value={(value) => {
            setEloAtual(value);
            setEloAtualSelectWindow(false);
          }}
        />
      )}
      {eloRequeridoSelectWindow && (
        <EloSelect
          close={() => {
            setEloRequeridoSelectWindow(false);
          }}
          value={(value) => {
            setEloRequerido(value);
            setEloRequeridoSelectWindow(false);
          }}
          highElo={true}
          reverse
        />
      )}
      <div className="center fullscreen">
        <Container className="p-3 bg-dark text-light ">
          <Row>
            <Col className="m-2 border border-primary rounded">
              <Form>
                <Form.Group>
                  <Form.Label>Coloque Seu Elo Atual</Form.Label>
                  <div
                    className="form-control form-control-img"
                    onClick={() => {
                      setEloAtualSelectWindow(true);
                    }}
                  >
                    {eloAtual.img && (
                      <img
                        src={eloAtual.img && eloAtual.img}
                        alt={eloAtual.elo + " Imagem"}
                      />
                    )}

                    {eloAtual.elo + " " + eloAtual.tier}
                  </div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Selecione a Sua fila ranqueda</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setFilaRanqueada(e.target.value);
                    }}
                    defaultValue=""
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
                {eloAtual.elo !== "Selecione seu Elo" && (
                  <Form.Group>
                    <Form.Label>Qual a Modalidade</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setModalidade(e.target.value);
                      }}
                      defaultValue=""
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
                )}
              </Form>
            </Col>

            {modalidade > 0 && modalidade < 3 && (
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label>Elo dos Sonhos</Form.Label>
                    <div
                      className="form-control form-control-img"
                      onClick={() => {
                        setEloRequeridoSelectWindow(true);
                      }}
                    >
                      {eloRequerido.img && (
                        <img
                          src={eloRequerido.img}
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
                </Form>
              </Col>
            )}

            {modalidade == 3 && (
              <Col>
                <Form>
                  <Form.Group>
                    <Form.Label> Quantas partidas? </Form.Label>
                    <Form.Control
                      type="number"
                      max={20}
                      min={1}
                      value={partidasAvulsas}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value > 20) {
                          value = 20;
                        }
                        if (value < 0) {
                          value = 0;
                        }
                        value = Math.floor(value);
                        setPartidasAvulsas(value);
                      }}
                      placeholder={1}
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
                </Form>
              </Col>
            )}
          </Row>
          <Row>
            <Col>
              <h1>
                {preco.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
            </Col>
            <Col>
              <Button
                variant="success"
                onClick={() => {
                  /*Place Code for submit
                  if(modalidade>0 &&modalidade <3){
                    {eloAtual,eloRequerido,filaRanqueada}
                  }
                  if(modalidade==3){
                    {eloAtual,partidasAvulsas,filaRanqueada}
                  }*/
                }}
              >
                Confirmar
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

function CheckBoxs({ options, onChange }) {
  let a = [];
  for (const key in options) {
    a.push(
      <Form.Check key={key}>
        <Form.Check.Input
          key={"Input:" + key}
          onChange={(e) => {
            onChange(key, e.target.checked);
          }}
          checked={
            (typeof options[key] === "boolean" && options[key]) ||
            options[key] === "disabled"
          }
          disabled={options[key] === "disabled"}
        ></Form.Check.Input>
        <Form.Check.Label key={"Label:" + key}>{key}</Form.Check.Label>
      </Form.Check>
    );
  }
  return a;
}
export default App;

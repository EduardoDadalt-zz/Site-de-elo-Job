import axios from "axios";
import { log } from "console";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import useSWR from "swr";
import CheckBoxs from "../components/CheckBox";
import SingIn from "../components/SingIn/SingIn";
import { Auth } from "../context/auth";

interface listObj {
  id: number;
}
interface ConfigProps {
  list: listObj[];
}

const Config: React.FC<ConfigProps> = () => {
  const { user } = useContext(Auth);
  const [token, setToken] = useState("1");
  const { data, error } = useSWR("/api/getElojob?t=" + token);
  const [elojob, setElojob] = useState([]);
  const [options, setOptions] = useState({
    modalidade: "0",
    concluido: true,
    recusado: true,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalOptions, setModalOptions] = useState<any>({});
  const [modalUserShow, setModalUserShow] = useState(false);
  const [modalUser, setModalUser] = useState({
    UsernameLol: "",
    PasswordLol: "",
  });

  useEffect(() => {
    if (user) {
      (async () => {
        const token = await user.getIdToken();
        setToken(token);
      })();
    }
  }, [user]);
  useEffect(() => {
    if (data) {
      setElojob(data);
    }
  }, [data]);
  if (error) {
    return (
      <>
        <Container>
          <Alert variant="danger">Algo deu Errado :C</Alert>
        </Container>
        {!user && (
          <Container>
            <SingIn />
          </Container>
        )}
      </>
    );
  }
  if (!data) {
    return (
      <Container className="center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Tabela</title>
      </Head>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        centered
      >
        <Modal.Body className="">
          <CheckBoxs
            options={modalOptions?.options ?? {}}
            onChange={() => {}}
          />
          <div>
            {(() => {
              let a = new Array<ReactNode>();
              for (const key in modalOptions?.optionValues) {
                a.push(
                  <div className="d-flex align-items-center justify-content-between">
                    <h4>{key + ": "}</h4>
                    {modalOptions?.optionValues[key]}
                  </div>
                );
              }
              return a;
            })()}
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={modalUserShow}
        onHide={() => {
          setModalUserShow(false);
        }}
        centered
      >
        <Modal.Body>
          {(() => {
            let a = new Array<React.ReactNode>();
            for (const key in modalUser) {
              a.push(
                <div className="d-flex align-items-center justify-content-between">
                  <h4>{key + ": "}</h4>
                  {modalUser[key]}
                </div>
              );
            }
            return a;
          })()}
        </Modal.Body>
      </Modal>
      <Container fluid="sm">
        <Accordion className="border border-dark rounded mb-3">
          <Card>
            <Card.Header>
              <Accordion.Toggle as="h4" eventKey="0">
                Filtros
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form.Group>
                  <Form.Label>Modalidade</Form.Label>
                  <Form.Control
                    as="select"
                    custom
                    value={options.modalidade}
                    onChange={(e) =>
                      setOptions({ ...options, modalidade: e.target.value })
                    }
                  >
                    {["Todos", "EloBoost", "DuoBoost", "Vitórias Avulsas"].map(
                      (e, x) => (
                        <option key={"option" + x} value={x}>
                          {e}
                        </option>
                      )
                    )}
                  </Form.Control>
                </Form.Group>
                <Form.Row>
                  {["concluido", "recusado"].map((e) => (
                    <Col className="col-auto">
                      <Form.Check>
                        <Form.Check.Input
                          checked={options[e]}
                          onChange={(change: ChangeEvent<HTMLInputElement>) =>
                            setOptions({
                              ...options,
                              [e]: change.target.checked,
                            })
                          }
                        />
                        <Form.Label>
                          {"Ocultar os " +
                            e.slice(0, 1).toUpperCase() +
                            e.slice(1)}
                        </Form.Label>
                      </Form.Check>
                    </Col>
                  ))}
                </Form.Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
      <Container fluid="xl">
        <Table>
          <thead>
            <tr>
              <th>Preço</th>
              <th>Elo Atual</th>
              <th>
                {options.modalidade === "1" || options.modalidade === "2"
                  ? "Elo Requerido"
                  : "Vitórias Avulsas"}
              </th>
              <th>Opções</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {elojob
              .filter(
                (f) =>
                  (f.modalidade == options.modalidade ||
                    options.modalidade == "0") &&
                  (options.concluido ? f.status !== "Concluído" : true) &&
                  (options.recusado ? f.status !== "Recusado" : true)
              )
              .map((elojob) => (
                <tr key={elojob.key}>
                  <td key={"price:" + elojob.key}>
                    {Number(elojob.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td key={"eloAtual:" + elojob.key}>
                    <div className="d-flex align-items-center">
                      {elojob?.eloAtual?.img && elojob?.eloAtual?.elo && (
                        <>
                          <Image
                            src={elojob.eloAtual.img}
                            height={30}
                            width={30}
                            objectFit="cover"
                          />
                          <span>
                            {elojob.eloAtual.elo + " " + elojob.eloAtual.tier}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td key={"eloRequerido:" + elojob.key}>
                    <div className="d-flex align-items-center">
                      {elojob?.eloRequerido?.elo && elojob?.eloRequerido?.img && (
                        <>
                          <Image
                            src={elojob.eloRequerido.img}
                            height={30}
                            width={30}
                            objectFit="cover"
                          />
                          <span>
                            {elojob.eloRequerido.elo +
                              " " +
                              elojob.eloRequerido.tier}
                          </span>
                        </>
                      )}
                      {elojob?.modalidade == 3 && elojob?.partidasAvulsas && (
                        <h5 className="text-center w-100">
                          {elojob.partidasAvulsas}
                        </h5>
                      )}
                    </div>
                  </td>
                  <td key={"options:" + elojob.key}>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        const { options, optionValues } = elojob;
                        setModalOptions({ options, optionValues });
                        setModalShow(true);
                      }}
                    >
                      Opções
                    </Button>
                  </td>
                  <td key={"status:" + elojob.key}>
                    <Form.Control
                      as="select"
                      defaultValue={elojob.status}
                      onChange={async (f) =>
                        axios
                          .post("/api/changeStatus", {
                            token: await user.getIdToken(),
                            id: elojob.key,
                            value: f.target.value,
                          })
                          .then(() => {
                            setElojob((prevState) => {
                              if (Array.isArray(prevState)) {
                                let i = prevState.findIndex(
                                  (c) => c.key === elojob.key
                                );
                                if (i === -1) return prevState;
                                prevState[i].status = f.target.value;
                                return prevState;
                              }
                              return prevState;
                            });
                          })
                      }
                      custom
                    >
                      {[
                        "Em Análise",
                        "Em Progesso",
                        "Concluído",
                        "Recusado",
                      ].map((f) => (
                        <option key={elojob.key + f} value={f}>
                          {f}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td key={"user:" + elojob.key}>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setModalUser(elojob.user);
                        setModalUserShow(true);
                      }}
                    >
                      Usuário
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Config;

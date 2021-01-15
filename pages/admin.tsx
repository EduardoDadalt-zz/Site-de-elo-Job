import Head from "next/head";
import Image from "next/image";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
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

  const [token, setToken] = useState("");
  const { data, error } = useSWR(token ? "/api/getElojob?t=" + token : null);
  const [modalidade, setModalidade] = useState<number>(1);
  const [elojob, setElojob] = useState([]);
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
      <Container className="border border-dark rounded">
        <h2>Filtros</h2>
        <Form.Group>
          <Form.Label>Modalidade</Form.Label>
          <Form.Control
            as="select"
            custom
            value={modalidade}
            onChange={(e) => setModalidade(Number(e.target.value))}
          >
            {["EloBoost", "DuoBoost", "Vitórias Avulsas"].map((e, x) => (
              <option key={"option" + x} value={x + 1}>
                {e}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Check label="Ocultar os Concluidos"></Form.Check>
        </Form.Group>
      </Container>
      <Container fluid="xl">
        <Table>
          <thead>
            <tr>
              <th>Preço</th>
              <th>Elo Atual</th>
              <th>
                {modalidade == 1 || modalidade == 2
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
              .filter((f) => f.modalidade == modalidade)
              .map((e) => (
                <tr key={e.key}>
                  <td key={"price:" + e.key}>
                    {Number(e.price).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td key={"eloAtual:" + e.key}>
                    <div className="d-flex align-items-center">
                      <Image
                        src={e.eloAtual.img}
                        height={30}
                        width={30}
                        objectFit="cover"
                      />
                      <span>{e.eloAtual.elo + " " + e.eloAtual.tier}</span>
                    </div>
                  </td>
                  <td key={"eloRequerido:" + e.key}>
                    <div className="d-flex align-items-center">
                      {e?.eloRequerido?.elo && e?.eloRequerido?.img && (
                        <>
                          <Image
                            src={e.eloRequerido.img}
                            height={30}
                            width={30}
                            objectFit="cover"
                          />
                          <span>
                            {e.eloRequerido.elo + " " + e.eloRequerido.tier}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        const { options, optionValues } = e;
                        setModalOptions({ options, optionValues });
                        setModalShow(true);
                      }}
                    >
                      Opções
                    </Button>
                  </td>
                  <td key={"status:" + e.key}>
                    <Form.Control as="select" defaultValue={e.status} custom>
                      {["Em Análise", "Em Progesso", "Concluído"].map((f) => (
                        <option key={e.key + f} value={f}>
                          {f}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setModalUser(e.user);
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

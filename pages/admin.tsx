import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
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
import { Auth } from "../context/auth";

interface listObj {
  id: number;
}
interface ConfigProps {
  list: listObj[];
}

const fetcher = async (url: string) => {
  const { user } = useContext(Auth);
  const token = await user.getIdToken();
  return (await axios.post(url, { token })).data;
};

const Config: React.FC<ConfigProps> = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/getElojob", fetcher);
  const [modalidade, setModalidade] = useState<number>(1);
  const [elojob, setElojob] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalOptions, setModalOptions] = useState({});

  useEffect(() => {
    if (data) {
      for (const key in data) {
        let arr = [];
        arr.push({ key, ...data[key] });
        setElojob(arr);
      }
    }
  }, [data]);
  if (error) {
    router.push("/");
    return (
      <Container>
        <Alert variant="danger">Algo deu Errado :C</Alert>
      </Container>
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
        <Modal.Body>
          <CheckBoxs options={modalOptions} onChange={() => {}} />
        </Modal.Body>
      </Modal>
      <Container fluid="xl">
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
            </tr>
          </thead>
          <tbody>
            {elojob
              // .filter((f) => f.modalidade == modalidade)
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
                      {e.eloRequerido && (
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
                        setModalOptions(e.options);
                        setModalShow(true);
                      }}
                    >
                      Opções
                    </Button>
                  </td>
                  <td key={"status:" + e.key}>
                    <Form.Control as="select" defaultValue={e.status} custom>
                      {["Em Análise", "Em Andamento", "Concluído"].map((f) => (
                        <option key={e.key + f} value={f}>
                          {f}
                        </option>
                      ))}
                    </Form.Control>
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

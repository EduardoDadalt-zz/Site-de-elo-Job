import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container, Form, Row, Table } from "react-bootstrap";
import Image from "next/image";
import useSWR from "swr";

interface listObj {
  id: number;
}
interface ConfigProps {
  list: listObj[];
}

const fetcher = async (url: string) => {
  return (await axios.get(url)).data;
};

const Config: React.FC<ConfigProps> = ({ list }) => {
  const router = useRouter();
  const { data, error } = useSWR("/api/getElojob");
  const [modalidade, setModalidade] = useState<number>(1);
  const [elojob, setElojob] = useState([]);
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
    return <div>Erro</div>;
  }
  if (!data) {
    return <Container>Carregando...</Container>;
  }

  return (
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
            <th>Elo Requerido</th>
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
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Config;

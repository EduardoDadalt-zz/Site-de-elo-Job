import fire from "../../config/fire";

import { GetServerSideProps } from "next";
import { Container, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import client from "../../prisma/client";

interface listObj {
  id: number;
}
interface ConfigProps {
  list: listObj[];
}

const Config: React.FC<ConfigProps> = ({ list }) => {
  return (
    <Container fluid>
      <Table>
        <thead>
          <th>ID</th>
          <th>Nome de Invocador</th>
          <th>Elo Atual</th>
          <th>Elo Requerido</th>
        </thead>
        <tbody>
          {Array.from(list).map((v) => (
            <tr>
              <td>{v.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Config;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await client.elojob.findMany();
  
  return {
    props: {
      list: [{ id: "1" }],
    },
  };
};

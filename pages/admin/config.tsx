import { GetServerSideProps } from "next";
import { Container, Table } from "react-bootstrap";

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
         
        </thead>
        <tbody>
          
        </tbody>
      </Table>
    </Container>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const res = await client.elojob.findMany();
  return {
    props: {
      list: [{ id: "1" }],
    },
  };
};

export default Config;

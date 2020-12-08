import fire from "../../config/fire";

import { GetServerSideProps } from "next";

const Config = ({ admin }) => {
  if (admin) return <div>A</div>;
  return <div></div>;
};
export default Config;


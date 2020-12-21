import Axios from "axios";

const fetcher = Axios.create({ baseURL: "http://localhost:3000" });

export default fetcher;

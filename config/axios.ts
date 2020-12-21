import Axios from "axios";

const fetcher = Axios.create({
  baseURL: "https://site-de-elo-job.vercel.app/",
});

export default fetcher;

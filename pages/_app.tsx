import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Header from "../components/Header";
import AuthProvider from "../context/auth";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <link rel="shortcut icon" href="logo.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

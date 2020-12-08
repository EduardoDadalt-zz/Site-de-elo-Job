import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";
import Header from "../components/Header";
import AuthProvider from "../context/auth";
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

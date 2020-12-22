import { createContext, useEffect, useState } from "react";
import fire from "../config/fire";
import firebase from "firebase/app";

interface AuthValues {
  user: firebase.User | null;
  showLoginModal: boolean;
  cadastroOn: boolean;
  openLoginWindow: Function;
  closeLoginWindow: Function;
  openRegisterWindow: Function;
  closeRegisterWindow: Function;
}
export const Auth = createContext<AuthValues | null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(
    fire.auth().currentUser
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cadastroOn, setCadastroOn] = useState(false);
  useEffect(() => {
    fire.auth().onAuthStateChanged((e) => {
      console.log(e);
      setUser(e);
    });
  }, []);
  const openLoginWindow = () => {
    setShowLoginModal(true);
  };
  const closeLoginWindow = () => {
    setShowLoginModal(false);
  };
  const openRegisterWindow = () => {
    setCadastroOn(true);
  };
  const closeRegisterWindow = () => {
    setCadastroOn(false);
  };
  return (
    <Auth.Provider
      value={{
        showLoginModal,
        openLoginWindow,
        closeLoginWindow,
        cadastroOn,
        user,
        openRegisterWindow,
        closeRegisterWindow,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;

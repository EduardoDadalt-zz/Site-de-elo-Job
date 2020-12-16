import { createContext, useEffect, useState } from "react";
import fire from "../config/fire";
import firebase from "firebase/app";

interface AuthValues {
  isLoggin: boolean;
  showLoginModal: boolean;
  openLoginWindow: Function;
  closeLoginWindow: Function;
  cadastroOn: boolean;
  setCadastroOn: Function;
  user: firebase.User;
  setUser: Function;
}
export const Auth = createContext<AuthValues | null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(fire.auth().currentUser);
  const [isLoggin, setIsLoggin] = useState(!!fire.auth().currentUser);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cadastroOn, setCadastroOn] = useState(false);
  useEffect(() => {
    setIsLoggin(!!user);
  }, [user]);
  const openLoginWindow = () => {
    setShowLoginModal(true);
  };
  const closeLoginWindow = () => {
    setShowLoginModal(false);
  };
  return (
    <Auth.Provider
      value={{
        isLoggin,
        showLoginModal,
        openLoginWindow,
        closeLoginWindow,
        cadastroOn,
        setCadastroOn,
        user,
        setUser,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;

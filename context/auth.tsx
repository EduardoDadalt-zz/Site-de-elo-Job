import { createContext, useState } from "react";
import fire from "../config/fire";

interface AuthValues {
  isLoggin: boolean;
  showLoginModal: boolean;
  openLoginWindow: Function;
  closeLoginWindow: Function;
  cadastroOn: boolean;
  setCadastroOn: Function;
}
export const Auth = createContext<AuthValues | null>(null);

const AuthProvider = ({ children }) => {
  const [isLoggin, setIsLoggin] = useState(!!fire.auth().currentUser);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cadastroOn, setCadastroOn] = useState(false);
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
      }}
    >
      {children}
    </Auth.Provider>
  );
};
export default AuthProvider;

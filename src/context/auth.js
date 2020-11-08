import { createContext, useContext, useEffect, useState } from "react";
import fire from "../config/fire";
import LoginContext from "./loginContext";
const Auth = createContext({});

export const AuthProvider = ({ children }) => {
  const { setLoginActive } = useContext(LoginContext);
  const [isLoggin, setIsLoggin] = useState(!!fire.auth().currentUser);

  fire.auth().onAuthStateChanged((user) => {
    setIsLoggin(!!user);
  });
  useEffect(() => {
    if (isLoggin === true) setLoginActive(false);
  }, [isLoggin, setLoginActive]);
  const SingIn = (email, pass) => {
    return fire.auth().signInWithEmailAndPassword(email, pass);
  };
  const SingUp = (email, pass) => {
    return fire.auth().createUserWithEmailAndPassword(email, pass);
  };
  const SingOut = () => {
    return fire.auth().signOut();
  };

  return (
    <Auth.Provider value={{ isLoggin, setIsLoggin, SingIn, SingUp, SingOut }}>
      {children}
    </Auth.Provider>
  );
};

export default Auth;

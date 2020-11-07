import { createContext, useState } from "react";
import fire from "../config/fire";
const Auth = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const SingIn = (email, pass) => {
    return fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((e) => {
        setIsLoggin(true);
        return e;
      });
  };

  const SingUp = (email, pass) => {
    return fire
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then((e) => {
        setIsLoggin(true);
        return e;
      });
  };
  const SingOut = () => {
    return fire
      .auth()
      .signOut()
      .then((e) => {
        setIsLoggin(false);
        return e;
      });
  };

  return (
    <Auth.Provider value={{ isLoggin, setIsLoggin, SingIn, SingUp, SingOut }}>
      {children}
    </Auth.Provider>
  );
};

export default Auth;

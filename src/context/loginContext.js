import { createContext, useEffect, useState } from "react";
const LoginContext = createContext({});

export const LoginContextProvider = ({ children }) => {
  const [loginActive, setLoginActive] = useState(false);
  const [cadastro, setCadastro] = useState(false);
  useEffect(() => {
    if (loginActive === false) setCadastro(false);
  }, [loginActive]);
  return (
    <LoginContext.Provider
      value={{ loginActive, setLoginActive, cadastro, setCadastro }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;

import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, ProgressBar } from "react-bootstrap";

const Page404 = () => {
  const router = useRouter();
  const [porcentagem, setPorcentagem] = useState(0);
  const goHome = () => {
    setTimeout(router.push, 500, "/");
  };

  useEffect(() => {
    let ml = 0;
    let timer = 10;
    var handleTimeinterval = setInterval(() => {
      ml += timer;
      setPorcentagem(ml);
      if (ml >= 100) goHome();
    }, (10000 / 100) * timer);
    return () => {
      clearInterval(handleTimeinterval);
    };
  }, []);
  return (
    <div>
      <Container>
        <h1>Página não encontrada :C</h1>
        <p>Você será mandado para a página inicial em 10 segundos</p>
        <p>
          <ProgressBar>
            <ProgressBar
              now={porcentagem}
              //   style={{ transitionDuration: "0.2s" }}
              label={porcentagem / 10 + " s"}
            />
          </ProgressBar>
        </p>
        <p>
          <Button onClick={goHome}>Ir para Home</Button>
        </p>
      </Container>
    </div>
  );
};

export default Page404;

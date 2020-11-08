import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { LoginContextProvider } from "./context/loginContext";
import Elojob from "./page/Elojob";
import Home from "./page/Home";

function Router() {
  return (
    <LoginContextProvider>
      <AuthProvider>
        <BrowserRouter>
          <Switch className="fullscreen p-0">
            <Route exact path="/" component={Home} />
            <Route path="/elojob" component={Elojob} />
            <Route path="/myprofile" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </LoginContextProvider>
  );
}

export default Router;

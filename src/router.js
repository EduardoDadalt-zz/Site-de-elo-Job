import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Elojob from "./page/Elojob";
import Home from "./page/Home";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch className="fullscreen p-0">
        <Route exact path="/" component={Home} />
        <Route path="/elojob" component={Elojob} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;

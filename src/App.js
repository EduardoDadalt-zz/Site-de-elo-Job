import React from "react";
import "./App.css";
import { AuthProvider } from "./context/auth";
import Router from "./router";
function App(props) {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;

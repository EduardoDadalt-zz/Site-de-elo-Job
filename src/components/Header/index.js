import React, { useContext } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.jpg";
import Auth from "../../context/auth";
import LoginContext from "../../context/loginContext";
import Login from "../Login";
import "./styles.css";
function Header() {
  const { isLoggin, SingOut } = useContext(Auth);
  // const isLoggin = false;
  // const SingOut = () => {};
  const { setLoginActive, setCadastro } = useContext(LoginContext);

  return (
    <>
      <Navbar
        style={{ backgroundColor: "var(--gray-dark)" }}
        variant="dark"
        expand="md"
      >
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} className="logo rounded" alt="logo" /> Galaxy Job
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/elojob?modalidade=1">
              Elo Booster
            </Nav.Link>
            <Nav.Link as={Link} to="/elojob?modalidade=2">
              Duo Booster
            </Nav.Link>
          </Nav>
          <div className="nav navbar-nav navbar-right mr-2">
            {isLoggin === false && (
              <Form inline className="my-2 my-lg-0 float-right">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setLoginActive(true);
                  }}
                >
                  Entrar
                </Button>
                <Button
                  variant="primary"
                  className="ml-2"
                  onClick={() => {
                    setLoginActive(true);
                    setCadastro(true);
                  }}
                >
                  Cadastra-se
                </Button>
              </Form>
            )}
            {isLoggin === true && (
              <NavDropdown
                title="Dropdown"
                className="float-right"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>Meu Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => SingOut().then((e) => {})}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Navbar>
      <Login />
    </>
  );
}

export default Header;

import { setupMaster } from "cluster";
import Link from "next/link";
import React, { useContext } from "react";
import { Button, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import fire from "../../config/fire";
import { Auth } from "../../context/auth";
import Login from "../Login";
const Logo = "/logo.jpg";
function Header() {
  const { openLoginWindow, setCadastroOn, user } = useContext(Auth);

  return (
    <>
      <Navbar
        style={{ backgroundColor: "var(--gray-dark)" }}
        variant="dark"
        expand="sm"
      >
        <Link href="/">
          <Navbar.Brand>
            <img src={Logo} className="logo rounded" alt="logo" /> Galaxy Job
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <Nav.Link as="a">Home</Nav.Link>
            </Link>
            <Link href="/elojob?modalidade=1">
              <Nav.Link as="a">Elo Booster</Nav.Link>
            </Link>
            <Link href="/elojob?modalidade=2">
              <Nav.Link as="a">Duo Booster</Nav.Link>
            </Link>
          </Nav>
          <div className="nav navbar-nav navbar-right mr-2"></div>
          {!!!user ? (
            <Form inline>
              <Button
                onClick={(e) => {
                  setCadastroOn(false);
                  openLoginWindow();
                }}
              >
                Entrar
              </Button>
            </Form>
          ) : (
            <NavDropdown title="Perfil" id="basic-nav-dropdown">
              <Link href="/perfil">
                <NavDropdown.Item as="a">Meu Perfil</NavDropdown.Item>
              </Link>
              <Link href="/pedido">
                <NavDropdown.Item as="a">Meu Pedido</NavDropdown.Item>
              </Link>
              <NavDropdown.Item
                as="button"
                onClick={(e) => {
                  fire.auth().signOut();
                }}
              >
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Login />
    </>
  );
}

export default Header;

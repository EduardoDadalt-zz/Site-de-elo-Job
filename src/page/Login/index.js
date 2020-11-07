import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginComponent from "../../components/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent";

const Login = () => {
  return (
    <Row>
      <Col>
        <Container>
          <LoginComponent />
        </Container>
      </Col>
      <Col>
        <Container>
          <RegisterComponent />
        </Container>
      </Col>
    </Row>
  );
};

export default Login;

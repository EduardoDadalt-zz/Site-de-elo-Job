import React, { memo } from "react";
import { Alert, Form } from "react-bootstrap";
import styles from "../../styles/elojob.module.css";

interface CheckBoxsProps {
  options: object;
  onChange: Function;
}
const CheckBoxsElement = ({ options, onChange }) => {
  let a = new Array();
  for (const key in options) {
    a.push(
      <Form.Check className="ml-3 mb-1" key={key} type="switch">
        <Form.Check.Input
          checked={
            (typeof options[key] === "boolean" && options[key]) ||
            options[key] === "disabled"
          }
          onChange={(e) => {
            onChange(key, e.target.value);
          }}
          disabled={options[key] === "disabled"}
        ></Form.Check.Input>
        <Form.Check.Label
          className={styles.notSelected}
          onClick={(e) => {
            if (options[key] != "disabled") onChange(key, !options[key]);
          }}
        >
          {key}
        </Form.Check.Label>
        {key === "Estou recebendo menos de 15 de PDL (+40%)" && (
          <Alert variant="warning" style={{ fontSize: "12px" }}>
            ⚠️ Jogadores que ganham menos de 15 de PDL demandam muitas partidas
            para que subir de elo. Se você não marcar e estiver o elojob estara
            cancelado
          </Alert>
        )}
      </Form.Check>
    );
  }

  return <>{a}</>;
};

const CheckBoxs = memo(CheckBoxsElement);
export default CheckBoxs;

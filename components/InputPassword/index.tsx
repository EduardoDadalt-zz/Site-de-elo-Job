import React, { ChangeEvent, useState } from "react";
import { Form, FormControlProps, InputGroup } from "react-bootstrap";
import Image from "next/image";

interface InputPasswordProps extends FormControlProps {
  children?: React.ReactNode;
  name: string;
  value: string;
}
const InputPassword: React.FC<InputPasswordProps> = ({
  name,
  value,
  ...opts
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <InputGroup>
      <Form.Control type="password" name={name} value={value} {...opts} />
      <InputGroup.Append
        onClick={(e) => {
          setVisible(!visible);
        }}
      >
        <InputGroup.Text>
          <Image
            width={24}
            height={24}
            src={!visible ? "/icons/eye.svg" : "/icons/eye-off.svg"}
          />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default InputPassword;

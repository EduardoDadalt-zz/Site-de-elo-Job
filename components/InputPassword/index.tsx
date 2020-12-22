import Image from "next/image";
import React, { memo, useState } from "react";
import { FormControl, FormControlProps, InputGroup } from "react-bootstrap";

const InputPassword = ({ name, value, ...opts }) => {
  const [visible, setVisible] = useState(false);
  return (
    <InputGroup>
      <FormControl
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        {...opts}
      />
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

export default memo(InputPassword);

import React, { ButtonHTMLAttributes } from "react";
import Icon from "../Icon";

import { Container } from "./styles";

interface ButtonProps {
  label: string;
  icon: string;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({ icon, label, ...others }) => {
  if (!label) return null;
  return (
    <Container>
      {label}
      {icon && <Icon name={icon} size={18} {...others} />}
    </Container>
  );
};

export default Button;

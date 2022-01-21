import React, { ButtonHTMLAttributes } from "react";
import Icon from "../Icon";

import { Container } from "./styles";

interface ButtonProps {
  label: string;
  icon: string;
  onClick?: () => void;
  [key: string]: any;
  hideLabelOnMobile?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  hideLabelOnMobile,
  icon,
  label,
  onClick,
  ...others
}) => {
  if (!label) return null;
  return (
    <Container onClick={onClick} hideLabelOnMobile={hideLabelOnMobile}>
      <span>{label}</span>
      {icon && <Icon name={icon} size={18} {...others} />}
    </Container>
  );
};

export default Button;

import React, { useRef } from "react";

import useDebounce from "../../utils/useDebounce";
import Icon from "../Icon";

import { Container } from "./styles";

interface InputProps {
  icon?: string;
  onChange?: (text: string) => void;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({ icon, onChange, ...others }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedHandleChange = useDebounce(
    (text: string) => (onChange ? onChange(text) : () => {}),
    300,
  );

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Container onClick={handleOnClick}>
      <input
        data-testid="search-box"
        onChange={debouncedHandleChange}
        ref={inputRef}
        {...others}
      />
      {icon && <Icon name={icon} size={24} />}
    </Container>
  );
};

export default Input;

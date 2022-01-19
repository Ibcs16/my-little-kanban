import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";

import { searchedTerm } from "../todosSlice";
import useDebounce from "../../../utils/useDebounce";

import { Container } from "./styles";
import Icon from "../../../components/Icon";

const SearchBox: React.FC = () => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const debouncedHandleChange = useDebounce(
    (text: string) => dispatch(searchedTerm(text)),
    300,
  );

  const handleOnSearch = (e: { target: HTMLInputElement }) =>
    debouncedHandleChange(e.target.value);

  const handleOnClick = () => {
    setFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Container onClick={handleOnClick} focused={focused}>
      <input
        data-testid="search-box"
        id="search"
        name="search"
        onChange={handleOnSearch}
        placeholder="Search cards"
        ref={inputRef}
        onBlur={() => setFocused(false)}
      />
      <Icon name="search" size={24} />
    </Container>
  );
};

export default SearchBox;

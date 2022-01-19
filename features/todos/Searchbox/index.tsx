import React, { useRef, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";

import { searchedTerm } from "../todosSlice";
import useDebounce from "../../../utils/useDebounce";

import { Container } from "./styles";
import Icon from "../../../components/Icon";

const SearchBox: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const debouncedHandleChange = useDebounce(
    (text: string) => dispatch(searchedTerm(text)),
    300,
  );

  const handleOnSearch = (e: { target: HTMLInputElement }) =>
    debouncedHandleChange(e.target.value);

  const handleOnClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Container onClick={handleOnClick}>
      <input
        data-testid="search-box"
        id="search"
        name="search"
        onChange={handleOnSearch}
        placeholder="Search cards"
        ref={inputRef}
      />
      <Icon name="search" size={24} />
    </Container>
  );
};

export default SearchBox;

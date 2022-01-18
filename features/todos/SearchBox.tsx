import React from "react";
import { useAppDispatch } from "../../app/hooks";

import { searchedTerm } from "./todosSlice";
import useDebounce from "../../utils/useDebounce";

// import { Container } from './styles';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const debouncedHandleChange = useDebounce(
    (text: string) => dispatch(searchedTerm(text)),
    300,
  );

  const handleOnSearch = (e: { target: HTMLInputElement }) =>
    debouncedHandleChange(e.target.value);

  return (
    <div>
      <input
        data-testid="search-box"
        id="search"
        name="search"
        onChange={handleOnSearch}
        placeholder="Search cards"
      />
    </div>
  );
};

export default SearchBox;

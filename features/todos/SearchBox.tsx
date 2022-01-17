import React from "react";
import { useAppDispatch } from "../../app/hooks";
import debounce from "lodash/debounce";
import { searchedTerm } from "./todosSlice";

// import { Container } from './styles';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const delayedHandleChange = debounce(
    text => dispatch(searchedTerm(text)),
    300,
  );

  const handleOnSearch = (e: { target: HTMLInputElement }) =>
    delayedHandleChange(e.target.value);

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

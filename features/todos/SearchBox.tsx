import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { debounce } from "lodash";
import { searchedTerm } from "./todosSlice";

// import { Container } from './styles';

const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const delayedHandleChange = debounce(
    text => dispatch(searchedTerm(text)),
    500,
  );

  const handleOnSearch = e => delayedHandleChange(e.target.value);

  return (
    <div>
      <input
        data-testid="search-box"
        id="search"
        name="search"
        onChange={handleOnSearch}
      />
    </div>
  );
};

export default SearchBox;

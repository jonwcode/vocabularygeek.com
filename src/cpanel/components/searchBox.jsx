import React, { useRef, useEffect } from "react";
import { ReactComponent as SearchIcon } from "../../assets/svg/magnifying-glass-solid.svg";
import css from "../module/searchBox.module.css";
import { ReactComponent as XIcon } from "../../assets/svg/xmark-solid.svg";

const SearchBox = ({ searchInput, setSearchInput }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (evt) => {
    setSearchInput(evt.target.value.trim());
  };

  const clearSearchBox = () => {
    setSearchInput("");
  };

  return (
    <span className={css.searchMenu}>
      <div className={css.searchLeft}>
        <input
          ref={inputRef}
          name="search"
          type="text"
          value={searchInput}
          onChange={handleChange}
        />
        <XIcon className={css.XIcon} onClick={clearSearchBox} />
      </div>
      <div className={css.searchRight}>
        <SearchIcon className={css.searchIcon} width="25" />
      </div>
    </span>
  );
};

export default SearchBox;

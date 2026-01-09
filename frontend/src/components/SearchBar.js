import React, { useEffect, useState } from "react";
import useDebouncedValue from "../hooks/useDebouncedValue";

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * Controlled input search component with debounced change callback.
 */
export default function SearchBar({ initialValue, onSearchChange, placeholder }) {
  const [value, setValue] = useState(initialValue || "");
  const debounced = useDebouncedValue(value, 250);

  useEffect(() => {
    onSearchChange?.(debounced);
  }, [debounced, onSearchChange]);

  return (
    <div className="searchBar" role="search" aria-label="Search phones">
      <div className="searchInputWrap">
        <span className="searchIcon" aria-hidden="true">
          ⌕
        </span>
        <input
          className="searchInput"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || "Search phones (brand, model, chipset, display...)"}
          aria-label="Search phones"
        />
      </div>
    </div>
  );
}

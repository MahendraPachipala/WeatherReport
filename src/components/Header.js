import React, { useCallback } from 'react';
import "../styles/header.css";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

function Header({ onSearch }) {
  // Create a debounced version of the onSearch function
  const debouncedSearch = useCallback(debounce(onSearch, 400), [onSearch]);

  const handleInput = (event) => {
    const value = event.target.value;
    debouncedSearch(value); // Call the debounced function
  };

  return (
    <div className="header">
      <div className="item1"><h1>Weather</h1></div>
      <div className="search">
        <div>
          <input 
            type="text" 
            name="search" 
            id="search" 
            placeholder="🔍 Search City" 
            onChange={handleInput} 
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

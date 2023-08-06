import React from 'react';
import './searchBar.css';

function SearchBar () {
  return (
    <>
      <input
        className='top-imp'
        id='search-inp'
        type="search"
        placeholder='Search'
      ></input>
    </>
  );
}

export default SearchBar;
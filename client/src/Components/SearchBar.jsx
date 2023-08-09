import React from 'react';
import './addAndSearch.css';

function SearchBar () {
  return (
    <>
      <input
        className='add-search-imp'
        id='search-inp'
        type="search"
        placeholder='Search'
      ></input>
    </>
  );
}

export default SearchBar;
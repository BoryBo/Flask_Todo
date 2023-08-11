import './addAndSearch.css';

function SearchBar ({ query, setQuery }) {

  function handleChange (ev) {
    setQuery(ev.target.value);
  }


  return (
    <>
      <input
        className='add-search-imp'
        id='search-inp'
        type="search"
        placeholder='Search'
        value={query}
        onChange={handleChange}
      ></input>
    </>
  );
}

export default SearchBar;
import React from 'react';
import css from './SearchBar.module.css';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          className={css.input}
          type="text"
          placeholder="Search images and photos"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
    </header>
  );
};

export default SearchBar;

//////////////// codigo de abajo original

{
  /* <header class="searchbar">
  <form className="form" onSubmit={handleSearch}>
    <button type="submit" className="button">
      <span class="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
      autocomplete="off"
      autofocus
      placeholder="Search images and photos"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  </form>
</header>;

export default searchBar; */
}

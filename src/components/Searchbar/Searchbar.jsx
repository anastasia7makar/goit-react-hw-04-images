import PropTypes from 'prop-types';
import { Component, useCallback, useState } from 'react';
import css from '../Searchbar/Searchbar.module.css';
import { Notify } from 'notiflix';

const Searchbar = ({ handleSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value.toLowerCase().trim());
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      if (value === '') {
        return Notify.info('Please, enter search word!');
      }

      handleSearch(value);
    },
    [value]
  );

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Searchbar;

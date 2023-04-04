import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiIngredient, fetchApiLetter, fetchApiName } from '../redux/actions';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleClick = async () => {
    if (filter === 'ingredient') {
      dispatch(fetchApiIngredient(search));
    } else if (filter === 'name-search') {
      dispatch(fetchApiName(search));
    } else if (filter === 'first-letter' && search.length <= 1) {
      dispatch(fetchApiLetter(search));
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  return (
    <div>
      <label htmlFor="input-ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="filter"
          id="input-ingredient"
          value="ingredient"
          onChange={ handleChange }
        />
        Ingredient
      </label>
      {' '}
      <label htmlFor="input-name-search">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="filter"
          id="input-name-search"
          value="name-search"
          onChange={ handleChange }
        />
        Name
      </label>
      {' '}
      <label htmlFor="input-first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter"
          id="input-first-letter"
          value="first-letter"
          onChange={ handleChange }
        />
        First Letter
      </label>
      {' '}
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

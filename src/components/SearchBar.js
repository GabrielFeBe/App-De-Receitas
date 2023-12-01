import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  fetchApiIngredient,
  fetchApiIngredientDrinks,
  fetchApiLetter,
  fetchApiLetterDrinks,
  fetchApiName,
  fetchApiNameDrinks } from '../redux/actions';

function SearchBar() {
  const [filter, setFilter] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search.search);
  const isLoading = useSelector((state) => state.search.isLoading);
  const data = useSelector((state) => state.search.data);
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFilter(target.value);
  };

  const handleClickMeals = () => {
    if (filter === 'ingredient') {
      dispatch(fetchApiIngredient(search));
    } else if (filter === 'name-search') {
      dispatch(fetchApiName(search));
    } else if (filter === 'first-letter' && search.length === 1) {
      dispatch(fetchApiLetter(search));
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const handleClickDrinks = () => {
    if (filter === 'ingredient') {
      dispatch(fetchApiIngredientDrinks(search));
    } else if (filter === 'name-search') {
      dispatch(fetchApiNameDrinks(search));
    } else if (filter === 'first-letter' && search.length <= 1) {
      dispatch(fetchApiLetterDrinks(search));
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };
  useEffect(() => {
    if (data && data.length === 1 && pathname === '/meals') {
      history.push(`/meals/${data[0].idMeal}`);
    } else if (data && data.length === 1 && pathname === '/drinks') {
      history.push(`/drinks/${data[0].idDrink}`);
    }
  }, [data, history, pathname]);

  if (!isLoading) {
    return (
      <div className="flex flex-col bg-[#41197F] rounded-[10px] flex-1">
        <section className="flex items-center justify-center gap-[20px]">

          <label
            htmlFor="input-ingredient"
            className=" text-[13px] font-normal leading-[9px] text-white"

          >
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="filter"
              id="input-ingredient"
              value="ingredient"
              onChange={ handleChange }
              className="w-[11px] h-[11px] rounded-[6px] mr-[5px]"
            />
            Ingredient
          </label>
          <label
            htmlFor="input-name-search"
            className=" text-[13px] font-normal leading-[9px] text-white"

          >
            <input
              data-testid="name-search-radio"
              type="radio"
              name="filter"
              id="input-name-search"
              value="name-search"
              onChange={ handleChange }
              className="w-[11px] h-[11px] rounded-[6px] mr-[5px]"

            />
            Name
          </label>
          <label
            htmlFor="input-first-letter"
            className=" text-[13px] font-normal leading-[9px] text-white"
          >
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              name="filter"
              id="input-first-letter"
              value="first-letter"
              onChange={ handleChange }
              className="w-[11px] h-[11px] rounded-[6px] mr-[5px]"

            />
            First Letter
          </label>
        </section>

        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={
            () => (pathname === '/meals' ? handleClickMeals() : handleClickDrinks())
          }
          className="text-white bg-[#FCC436] w-[208px] h-[25px]
          rounded-[5px] m-auto flex justify-center items-center"
        >
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchBar;

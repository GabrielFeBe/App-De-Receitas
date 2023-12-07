import React from 'react';
import PropTypes from 'prop-types';
import all from '../svg/all.svg';
import meal from '../svg/MealsOptions/All.svg';
import drink from '../svg/DrinkOptions/All.svg';

export default function FilterButtons({ handleFilterAll, handleFilterMeals,
  handleFilterDrinks }) {
  return (

    <section className="flex items-center gap-[30px] justify-center mt-[37px]">

      <button
        data-testid="filter-by-all-btn"
        onClick={ () => { handleFilterAll(); } }
        className="h-[70px] xxs:h-[85px] sm:h-[100px]
w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
      >
        <img
          src={ all }
          alt=""
          className="w-[40px] xxs:w-[55px] sm:w-[70px]"
        />
        <small className="text-[9px] leading-[10px]">All</small>
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => { handleFilterMeals(); } }
        className="h-[70px] xxs:h-[85px] sm:h-[100px]
w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
      >
        <img
          src={ meal }
          alt=""
          className="w-[40px] xxs:w-[55px] sm:w-[70px]"
        />
        <small className="text-[9px] leading-[10px]">Meals</small>
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          handleFilterDrinks();
        } }
        className="h-[70px] xxs:h-[85px] sm:h-[100px]
w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
      >
        <img
          src={ drink }
          alt=""
          className="w-[40px] xxs:w-[55px] sm:w-[70px]"
        />
        <small className="text-[9px] leading-[10px]">Drinks</small>
      </button>
    </section>
  );
}

FilterButtons.propTypes = {
  handleFilterAll: PropTypes.func.isRequired,
  handleFilterMeals: PropTypes.func.isRequired,
  handleFilterDrinks: PropTypes.func.isRequired,
};

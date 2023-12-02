import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';
import {
  fetchByCategory,
  fetchByCategoryDrinks,
  fetchCleanFilter,
  fetchCleanFilterDrinks,
} from '../redux/actions';
import Header from './Header';
import { catalogDrinkHashmap, catalogMealgHashmap } from '../utils/ImageHashMap';

export default function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoryMeals, setCategoryMaels] = useState([]);
  const [categorySelect, setCategorySelect] = useState(false);

  useEffect(() => {
    const drinksCategories = async () => {
      const number = 5;
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const drinksFive = data.drinks.slice(0, number);
      setCategoryDrinks(drinksFive);
    };
    drinksCategories();
  }, []);

  useEffect(() => {
    const mealsCategories = async () => {
      const number = 5;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const mealsFive = data.meals.slice(0, number);
      setCategoryMaels(mealsFive);
    };
    mealsCategories();
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <Header />
      <div
        className="flex h-[120px] xxs:h-[140px] gap-[5px] xxs:gap-[7px] sm:gap-[10px]
      sm:h-[160px] items-center justify-center"
      >
        {pathname === '/meals'
          ? (
            <button
              data-testid="All-category-filter"
              onClick={ () => dispatch(fetchCleanFilter()) }
              className="h-[70px] xxs:h-[85px] sm:h-[100px]
               w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
            >
              <img
                src={ catalogMealgHashmap.All }
                alt=""
                className="w-[40px] xxs:w-[55px] sm:w-[70px]"
              />
              <small
                className="text-[9px] leading-[10px]"
              >
                All
              </small>
            </button>
          )
          : (
            <button
              data-testid="All-category-filter"
              onClick={ () => dispatch(fetchCleanFilterDrinks()) }
              className="h-[70px] xxs:h-[85px] sm:h-[100px]
               w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
            >
              <img
                src={ catalogDrinkHashmap.All }
                alt=""
                className="w-[40px] xxs:w-[55px] sm:w-[70px]"

              />
              <small
                className="text-[9px] leading-[10px]"
              >
                All
              </small>
            </button>)}

        {pathname === '/drinks' ? categoryDrinks.map((drink, i) => (
          <button
            key={ i }
            data-testid={ `${drink.strCategory}-category-filter` }
            onClick={ () => {
              if (!categorySelect) {
                dispatch(fetchByCategoryDrinks(drink.strCategory));
                setCategorySelect(true);
              } else {
                dispatch(fetchCleanFilterDrinks());
                setCategorySelect(false);
              }
            } }
            className="h-[70px] xxs:h-[85px] sm:h-[100px]
            w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
          >
            <img
              src={ catalogDrinkHashmap[drink.strCategory] }
              className="w-[40px] xxs:w-[55px] sm:w-[70px]"
              alt=""
            />
            <small className="text-[9px] leading-[10px]">{drink.strCategory}</small>
          </button>)) : categoryMeals.map((meals, i) => (
          (
            <button
              key={ i }
              data-testid={ `${meals.strCategory}-category-filter` }
              onClick={ () => {
                if (!categorySelect) {
                  dispatch(fetchByCategory(meals.strCategory));
                  setCategorySelect(true);
                } else {
                  dispatch(fetchCleanFilter());
                  setCategorySelect(false);
                }
              } }
              className="h-[70px] xxs:h-[85px] sm:h-[100px]
              w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
            >
              <img
                src={ catalogMealgHashmap[meals.strCategory] }
                className="w-[40px] xxs:w-[55px] sm:w-[70px]"
                alt=""
              />
              <small className="text-[9px] leading-[10px]">{meals.strCategory}</small>
            </button>)
        ))}
      </div>

      {pathname === '/meals' ? <Meals /> : <Drinks />}
    </div>
  );
}

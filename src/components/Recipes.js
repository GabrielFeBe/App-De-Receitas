import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Drinks from '../pages/Drinks';
import Meals from '../pages/Meals';

export default function Recipes() {
  const location = useLocation();
  const { pathname } = location;

  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [categoryMeals, setCategoryMaels] = useState([]);

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

  return (
    <div>
      <div>

        {pathname === '/drinks' ? categoryDrinks.map((drink, i) => (
          <button
            key={ i }
            data-testid={ `${drink.strCategory}-category-filter` }
          >
            {drink.strCategory}
          </button>)) : categoryMeals.map((meals, i) => (
          (
            <button
              key={ i }
              data-testid={ `${meals.strCategory}-category-filter` }
            >
              {meals.strCategory}
            </button>)
        ))}
      </div>

      {pathname === '/meals' ? <Meals /> : <Drinks />}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function RecipeButton() {
  const [condition, setCondition] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  console.log(pathname);
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
  console.log(pathnameAfterSplit);
  const inProgRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  useEffect(() => {
    if (inProgRecipes !== null) {
      const drinksKeys = Object.keys(inProgRecipes.drinks || {});
      const mealsKeys = Object.keys(inProgRecipes.meals || {});
      switch (pathnameAfterSplit) {
      case 'meals':
        setCondition(mealsKeys.includes(pathnameId));
        break;
      default:
        setCondition(drinksKeys.includes(pathnameId));
        break;
      }
    }
  }, [pathnameAfterSplit, inProgRecipes, pathnameId]);
  return (
    <div className="m-auto w-[250px] smd:w-[335px]">

      { condition ? (
        <button
          className="w-[250px] smd:w-[335px] bg-[#FCC436] mt-[35px] mb-[35px]
        text-white h-[40px] rounded-md"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${pathname}/in-progress`) }

        >
          CONTINUE RECIPE

        </button>)
        : (
          <button
            className="w-[250px] smd:w-[335px] bg-[#FCC436] mt-[35px] mb-[35px]
          text-white h-[40px] rounded-md"
            data-testid="start-recipe-btn"
            onClick={ () => history.push(`${pathname}/in-progress`) }
          >
            START RECIPE

          </button>
        )}
    </div>
  );
}

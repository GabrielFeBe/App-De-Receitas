import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeButton() {
  const [condition, setCondition] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
  console.log(pathnameAfterSplit);
  const inProgRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  useEffect(() => {
    if (inProgRecipes !== null) {
      const drinksKeys = Object.keys(inProgRecipes.drinks || {});
      const mealsKeys = Object.keys(inProgRecipes.meals || {});
      console.log(drinksKeys);
      console.log(mealsKeys);
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
    <div>

      { condition ? (
        <button className="startRecipe" data-testid="start-recipe-btn">
          Continue Recipe

        </button>)
        : (
          <button className="startRecipe" data-testid="start-recipe-btn">
            Start Recipe

          </button>
        )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { recommendationDrinks,
  recommendationMeals,
  fetchMealUsingId,
  fetchDrinkUsingId } from '../redux/actions';
import Carousel from './Carousel';
import RecipeButton from './RecipeButton';
import Recipe from './Recipe';

function RecipeDetails() {
  const [recipeAlreadyBeenDone, setRecipeAlreadyBeenDone] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
  const loading = useSelector(({ recommend }) => recommend.recommendLoading);
  const recipeLoading = useSelector(
    ({ RecipePage: { detailsLoading } }) => detailsLoading,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathnameAfterSplit === 'meals') {
      dispatch(fetchMealUsingId(pathnameId));
      dispatch(recommendationMeals());
    } else {
      dispatch(fetchDrinkUsingId(pathnameId));
      dispatch(recommendationDrinks());
    }
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneReciepes = JSON.parse(localStorage.getItem('doneRecipes'));
  useEffect(() => {
    if (doneReciepes !== null) {
      const recipeDone = doneReciepes.some((recipe) => +recipe.id === +pathnameId);
      setRecipeAlreadyBeenDone(recipeDone);
    }
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {!recipeLoading && <Recipe /> }
      {!loading && <Carousel />}
      { !recipeAlreadyBeenDone && <RecipeButton />}
    </div>
  );
}

export default RecipeDetails;

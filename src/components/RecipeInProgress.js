import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { recommendationDrinks,
  recommendationMeals,
  fetchMealUsingId,
  fetchDrinkUsingId } from '../redux/actions';
import Recipe from './Recipe';

function RecipeInProgress() {
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
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

  return (
    <div>
      {!recipeLoading && <Recipe /> }
    </div>
  );
}

export default RecipeInProgress;

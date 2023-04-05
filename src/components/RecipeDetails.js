import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { recommendationDrinks, recommendationMeals } from '../redux/actions';
import Carousel from './Carousel';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [urlForVideo, setUrlForVideo] = useState('');
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameId = pathnameSplited[2];
  const loading = useSelector(({ recommend }) => recommend.recommendLoading);
  console.log(loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pathnameSplited);
    if (pathnameAfterSplit === 'meals') {
      const fetchMeals = async () => {
        const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${pathnameId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeDetails(data.meals);
      };
      dispatch(recommendationMeals());
      fetchMeals();
    } else {
      const fetchDrinks = async () => {
        const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${pathnameId}`;
        const response = await fetch(endPoint);
        const data = await response.json();
        setRecipeDetails(data.drinks);
      };
      dispatch(recommendationDrinks());
      fetchDrinks();
    }
  }, []);
  useEffect(() => {
    if (recipeDetails.length > 0) {
      const keys = Object.keys(recipeDetails[0]);
      const values = Object.values(recipeDetails[0]);
      const ingredients = [];
      const measurement = [];
      keys.forEach((key, index) => {
        if (key.includes('Ingredient') && values[index] !== null) {
          ingredients.push(values[index]);
        }
        if (key.includes('Measure') && values[index] !== null) {
          measurement.push(values[index]);
        }
      });
      const filteredMeasure = measurement.filter(
        (measure) => measure.length > 0 || false,
      );
      const filteredIngredients = ingredients.filter(
        (ingredientsFil) => ingredientsFil.length > 0,
      );
      const arrayOfInstructions = filteredIngredients.map(
        (instruction, index) => (
          { ingredient: instruction, measure: filteredMeasure[index] }),
      );
      setIngredientAndMeasure(arrayOfInstructions);
    }
    if (pathnameAfterSplit === 'meals' && recipeDetails.length > 0) {
      const url = recipeDetails[0].strYoutube;
      const urlForUse = url.replaceAll('watch?v=', 'embed/');
      setUrlForVideo(urlForUse);
    }
  }, [recipeDetails]);

  return (
    <div>
      {recipeDetails.length > 0
      && (
        <h2
          data-testid="recipe-title"
        >
          {recipeDetails[0].strDrink || recipeDetails[0].strMeal}

        </h2>)}
      { recipeDetails.length > 0
      && (
        <>
          <img
            src={ recipeDetails[0].strDrinkThumb || recipeDetails[0].strMealThumb }
            alt="recipe content"
            data-testid="recipe-photo"
          />
          <p data-testid="recipe-category">
            { pathnameAfterSplit === 'meals' ? recipeDetails[0].strCategory
              : recipeDetails[0].strAlcoholic}

          </p>
          <p data-testid="instructions">{recipeDetails[0].strInstructions}</p>

        </>)}
      {ingredientAndMeasure.map(({ ingredient, measure }, index) => (
        <p
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {`${ingredient}: ${measure}`}

        </p>))}
      { pathnameAfterSplit === 'meals' && recipeDetails.length > 0
      && <iframe
        width="560"
        height="315"
        src={ urlForVideo }
        data-testid="video"
        title="YouTube video player"
        allow="accelerometer;
        autoplay;
        clipboard-write;
         encrypted-media;
          gyroscope;
          picture-in-picture;
           web-share"
        allowfullscreen
      /> }

      {!loading && <Carousel />}
    </div>
  );
}

export default RecipeDetails;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function RecipeDetails() {
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [urlForVideo, setUrlForVideo] = useState('');
  const location = useLocation();
  const [checkboxID, setCheckboxID] = useState([]);
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const recipeDetails = useSelector(({ RecipePage }) => RecipePage.detailsObject);
  console.log(pathnameSplited);
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
      {pathnameSplited.length === 4 ? ingredientAndMeasure.map(
        ({ ingredient, measure }, index) => (
          <label
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ index }
            className={ checkboxID.includes(index) ? 'riscado' : undefined }
          >
            <input
              type="checkbox"
              id={ index }
              onChange={ () => {
                if (checkboxID.includes(index)) {
                  setCheckboxID(checkboxID.filter((checkbox) => checkbox !== index));
                } else {
                  setCheckboxID([...checkboxID, index]);
                }
              } }
              checked={ checkboxID.includes(index) }
            />
            {`${ingredient}: ${measure}`}
          </label>),
      )
        : ingredientAndMeasure.map(({ ingredient, measure }, index) => (
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
    </div>
  );
}

export default RecipeDetails;

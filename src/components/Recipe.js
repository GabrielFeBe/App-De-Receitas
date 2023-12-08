import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { catalogMealgHashmap, catalogDrinkHashmap } from '../utils/ImageHashMap';

const four = 4;

function RecipeDetails() {
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [urlForVideo, setUrlForVideo] = useState('');
  const location = useLocation();
  const [checkboxID, setCheckboxID] = useState([]);
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const pathnameID = pathnameSplited[2];
  const recipeDetails = useSelector(({ RecipePage }) => RecipePage.detailsObject);
  const history = useHistory();
  const recipe = useSelector(({ RecipePage }) => RecipePage.detailsObject)[0];

  useEffect(() => {
    const inProgRecipe = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    ) || {};
    if (!inProgRecipe[pathnameAfterSplit]) {
      inProgRecipe[pathnameAfterSplit] = {};
    }
    const pageInfo = inProgRecipe[pathnameAfterSplit][pathnameID] || [];
    setCheckboxID(pageInfo);
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeDetails]);

  return (
    <div className="w-full">
      {recipeDetails.length > 0
      && (
        <h1
          data-testid="recipe-title"
          className="relative  w-full h-[40vh] h-[40dvh] text-white text-xl
           bg-cover bg-no-repeat bg-center flex justify-center items-center font-black"
          style={ { backgroundImage: `url("${recipeDetails[0].strDrinkThumb
             || recipeDetails[0].strMealThumb}")` } }
        >
          {recipeDetails[0].strDrink || recipeDetails[0].strMeal.toUpper}
          <FavoriteButton />
          <div className="absolute top-2 left-2 flex items-center gap-[13px]">
            <img
              src={ pathnameAfterSplit === 'meals'
                ? catalogMealgHashmap[recipeDetails[0].strCategory]
                : catalogDrinkHashmap[recipeDetails[0].strCategory] }
              alt=""
            />
            <small className="font-bold text-sm text-[#FCC436]">
              { recipeDetails[0].strCategory}
            </small>
          </div>
        </h1>)}
      {pathnameSplited.length === four
        ? (
          <div>
            <ul
              className=" p-[17px] border-[2px]
               border-[#B1B1B1] rounded-md "
            >
              {

                ingredientAndMeasure.map(
                  ({ ingredient, measure }, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor={ index }
                      className={ checkboxID.includes(index) ? 'riscado' : undefined }
                    >
                      <input
                        type="checkbox"
                        id={ index }
                        onChange={ ({ target }) => {
                          if (checkboxID.includes(index)) {
                            const inProgRecipe = JSON.parse(
                              localStorage.getItem('inProgressRecipes'),
                            ) || {};
                            inProgRecipe[pathnameAfterSplit] = inProgRecipe[
                              pathnameAfterSplit]
                  || {};
                            inProgRecipe[
                              pathnameAfterSplit][pathnameID] = checkboxID.filter(
                              (checkbox) => checkbox !== +target.id,
                            );
                            localStorage.setItem(
                              'inProgressRecipes',
                              JSON.stringify(inProgRecipe),
                            );
                            setCheckboxID(checkboxID.filter(
                              (checkbox) => checkbox !== +target.id,
                            ));
                          } else {
                            const inProgRecipe = JSON.parse(
                              localStorage.getItem('inProgressRecipes'),
                            ) || {};
                            inProgRecipe[pathnameAfterSplit] = inProgRecipe[
                              pathnameAfterSplit]
                  || {};
                            inProgRecipe[pathnameAfterSplit][pathnameID] = [
                              ...checkboxID, +target.id];
                            localStorage.setItem(
                              'inProgressRecipes',
                              JSON.stringify(inProgRecipe),
                            );
                            setCheckboxID([...checkboxID, +target.id]);
                          }
                        } }
                        checked={ checkboxID.includes(index) }
                      />
                      {`${ingredient}: ${measure}`}
                    </li>),
                )
              }
            </ul>
          </div>
        )
        : (
          <div className=" w-[250px] smd:w-[335px] m-auto">
            <h2 className="ml-[10px]">Ingredients</h2>
            <ul
              className=" p-[17px] border-[2px]
               border-[#B1B1B1] rounded-md "
            >

              {ingredientAndMeasure.map(({ ingredient, measure }, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  className="text-[#1A1B1C] text-sm"
                >
                  {`${ingredient}: ${measure}`}

                </li>))}
            </ul>
          </div>

        )}

      { recipeDetails.length > 0
      && (
        <p data-testid="instructions">{recipeDetails[0].strInstructions}</p>)}

      { pathnameAfterSplit === 'meals' && recipeDetails.length > 0
      && <iframe
        width="fit-content"
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
      {pathnameSplited.length === four && (
        <button
          data-testid="finish-recipe-btn"
          className="startRecipe"
          disabled={ checkboxID.length !== ingredientAndMeasure.length }
          onClick={ () => {
            history.push('/done-recipes');
            const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
            console.log(doneRecipes);
            const savingFavoriteRecipeObject = {
              id: recipe.idDrink || recipe.idMeal,
              type: recipe.idDrink !== undefined ? 'drink' : 'meal',
              nationality: recipe.strArea !== undefined ? recipe.strArea : '',
              category: recipe.strCategory || '',
              alcoholicOrNot: recipe.strAlcoholic
              !== undefined ? recipe.strAlcoholic : '',
              name: recipe.strDrink || recipe.strMeal,
              image: recipe.strDrinkThumb || recipe.strMealThumb,
              doneDate: new Date(),
              tags: recipe.strTags !== null ? recipe.strTags.split(',') : [],
            };
            doneRecipes.push(savingFavoriteRecipeObject);
            console.log(doneRecipes);
            localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
          } }
        >
          Finish Recipe
        </button>)}
    </div>
  );
}

export default RecipeDetails;

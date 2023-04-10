import React from 'react';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const [doneRecipes] = useLocalStorage('doneRecipes', [{}]);
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn">All</button>
      <button data-testid="filter-by-meal-btn">Meals</button>
      <button data-testid="filter-by-drink-btn">Drinks</button>

      {doneRecipes?.map((recipe, index) => (
        <>
          <image
            key={ index }
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
          />
          <h4 data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</h4>
          <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDtae}</p>

          <button data-testid={ `${index}-horizontal-share-btn` }>Compartilhar</button>
          {recipe.tags.map((tag, indexTag) => (
            <p
              key={ indexTag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag.tagName}

            </p>

          ))}
        </>
      ))}
    </div>
  );
}

export default DoneRecipes;

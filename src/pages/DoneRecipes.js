import React from 'react';
import shareButton from '../images/shareIcon.svg';
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
        recipe.type === 'meal'
          ? <>
            <img
              style={ { width: '260px' } }
              alt="icone do botao"
              key={ index }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}

            </h3>

            <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button>
              <img
                style={ { width: '30px' } }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="icone do botao"
                src={ shareButton }
              />
            </button>

            {recipe.tags.map((tag, indexTag) => (
              <p
                key={ indexTag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </p>

            ))}
          </>
          : <>
            <img
              alt="icone do botao"
              style={ { width: '260px' } }
              key={ index }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            />
            <h4 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h4>
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.alcoholicOrNot}

            </h3>
            <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
            <button>
              <img
                style={ { width: '30px' } }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="icone do botao"
                src={ shareButton }
              />
            </button>
          </>

      ))}
    </div>
  );
}

export default DoneRecipes;

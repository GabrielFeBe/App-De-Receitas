import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [messageCopied, setMessageCopied] = useState(false);

  const getItem = () => {
    const recoveredData = localStorage.getItem('favoriteRecipes');

    return JSON.parse(recoveredData) || [];
  };

  useEffect(() => {
    setFavorite(getItem());
  }, []);

  const handleClickMeal = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);

    setMessageCopied(true);
  };

  const handleClickDrink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);

    setMessageCopied(true);
  };

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>
      <div>
        {favorite.map((rec, index) => (
          rec.type === 'meal' ? (
            <section key={ rec.id }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ rec.image }
                alt={ `Imagem da receita ${rec.name}` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{rec.name}</p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${rec.nationality} - ${rec.category}`}
              </p>
              <button
                type="button"
                onClick={ () => handleClickMeal(rec.id) }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="Share Button"
                />
              </button>
              <button type="button">
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Favorite Button"
                />
              </button>
              {messageCopied && <p>Link copied!</p>}
            </section>
          )
            : (
              <section key={ rec.id }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ rec.image }
                  alt={ `Imagem do drink ${rec.name}` }
                />
                <p data-testid={ `${index}-horizontal-name` }>{rec.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${rec.alcoholicOrNot}`}
                </p>
                <button
                  type="button"
                  onClick={ () => handleClickDrink(rec.id) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Share Button"
                  />
                </button>
                <button type="button">
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="Favorite Button"
                  />
                </button>
                {messageCopied && <p>Link copied!</p>}
              </section>
            )
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;

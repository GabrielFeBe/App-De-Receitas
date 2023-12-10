import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterButtons from '../components/FilterButtons';
import heart from '../svg/profile/favHeart.svg';
import share from '../svg/profile/share.svg';

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

  const handleFavorite = (id) => {
    const currentArray = getItem();
    const newArray = currentArray.filter((recipe) => recipe.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavorite(newArray);
  };

  const handleClickMeal = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/meals/${id}`);

    setMessageCopied(true);
  };

  const handleClickDrink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);

    setMessageCopied(true);
  };

  const handleFilterAll = () => {
    setFavorite(getItem());
  };

  const handleFilterMeals = () => {
    const rawDataMeal = getItem();
    const filteredDataMeal = rawDataMeal.filter((recipe) => recipe.type === 'meal');

    setFavorite(filteredDataMeal);
  };

  const handleFilterDrinks = () => {
    const rawDataDrink = getItem();
    const filteredDataDrink = rawDataDrink.filter((recipe) => recipe.type === 'drink');

    setFavorite(filteredDataDrink);
  };

  return (
    <>
      <Header />
      <div>
        <FilterButtons
          handleFilterAll={ handleFilterAll }
          handleFilterMeals={ handleFilterMeals }
          handleFilterDrinks={ handleFilterDrinks }

        />
      </div>
      <main className="flex flex-wrap justify-center gap-[20px] mb-[80px]">

        {favorite.map((rec, index) => (
          rec.type === 'meal' ? (
            <section
              key={ rec.id }
              className="flex w-[318px] h-[140px] relative mt-[20px] p-0"
            >
              <Link
                to={ `/meals/${rec.id}` }
                className="h-full w-[163.34px] rounded-l-md"

              >
                <img
                  src={ rec.image }
                  alt={ `Imagem da receita ${rec.name}` }
                  className="h-full w-[163.34px] rounded-l-md"
                  data-testid={ `${index}-horizontal-image` }

                />
              </Link>
              <section
                className=" border-[0.52px] border-[#B1B1B1] flex-1
                rounded-r-md flex flex-col"
              >

                <Link
                  to={ `/meals/${rec.id}` }
                  className="w-full mt-[19px] mb-[5px] no-underline"

                >
                  <h2
                    data-testid={ `${index}-horizontal-name` }
                    className="text-[#1A1B1C] font-bold text-[12px]
                  leading-[13px] text-center m-0"
                  >
                    {rec.name}

                  </h2>
                </Link>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                  className="leading-[9px] text-[9px] text-[#797D86] text-center"
                >
                  {`${rec.nationality} - ${rec.category}`}
                </h3>
                <div
                  className="flex mt-[35px] items-center gap-[15px] justify-between
                  ml-[20.65px] mr-[20.65px]"
                >
                  <button
                    type="button"
                    onClick={ () => handleClickMeal(rec.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-share-btn` }
                      src={ share }
                      alt="Share Button"
                      className="h-[30px] w-[30px]"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={ () => handleFavorite(rec.id) }
                  >
                    <img
                      data-testid={ `${index}-horizontal-favorite-btn` }
                      src={ heart }
                      alt="Favorite Button"
                      className="h-[30px] w-[30px]"
                    />
                  </button>
                  {messageCopied
                  && (
                    <small
                      className="absolute
                  bottom-0"
                    >
                      Link copied!

                    </small>)}
                </div>

              </section>

            </section>
          )
            : (
              <section
                key={ rec.id }
                className="flex w-[318px] h-[140px] relative mt-[20px] p-0"
              >
                <Link
                  to={ `/drinks/${rec.id}` }
                  className="h-full w-[163.34px] rounded-l-md"
                >
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ rec.image }
                    alt={ `Imagem do drink ${rec.name}` }
                    className="h-full w-[163.34px] rounded-l-md"
                  />
                </Link>
                <section
                  className=" border-[0.52px] border-[#B1B1B1] flex-1
                rounded-r-md flex flex-col"
                >
                  <Link
                    to={ `/drinks/${rec.id}` }
                    className="w-full mt-[19px] mb-[5px] no-underline"

                  >
                    <h2
                      data-testid={ `${index}-horizontal-name` }
                      className="text-[#1A1B1C] font-bold text-[12px]
                    leading-[13px] text-center m-0"
                    >
                      {rec.name}
                    </h2>
                  </Link>
                  <h3
                    data-testid={ `${index}-horizontal-top-text` }
                    className="leading-[9px] text-[9px] text-[#797D86] text-center"
                  >
                    {`${rec.alcoholicOrNot}`}
                  </h3>
                  <div
                    className="flex mt-[35px] items-center gap-[15px] justify-between
                  ml-[20.65px] mr-[20.65px]"
                  >
                    <button
                      type="button"
                      onClick={ () => handleClickDrink(rec.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-share-btn` }
                        src={ share }
                        alt="Share Button"
                        className="h-[30px] w-[30px]"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={ () => handleFavorite(rec.id) }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ heart }
                        alt="Favorite Button"
                        className="h-[30px] w-[30px]"
                      />
                    </button>
                    {messageCopied
                     && (
                       <small
                         className="absolute
                     bottom-0"
                       >
                         Link copied!

                       </small>)}
                  </div>

                </section>

              </section>
            )
        ))}
      </main>
      <Footer />
    </>
  );
}

export default FavoriteRecipes;

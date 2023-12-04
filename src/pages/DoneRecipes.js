import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareButton from '../images/shareIcon.svg';
import Header from '../components/Header';
import useLocalStorage from '../hooks/useLocalStorage';
import all from '../svg/all.svg';
import meal from '../svg/MealsOptions/All.svg';
import drink from '../svg/DrinkOptions/All.svg';

function DoneRecipes() {
  const [doneRecipes] = useLocalStorage('doneRecipes');
  const [copied, setCopied] = useState(false);
  const [filterRecipes, setFilterRecipes] = useState('all');
  const history = useHistory();
  console.log(doneRecipes);
  return (
    <div>
      <Header />
      <section className="flex items-center gap-[30px] justify-center mt-[37px]">

        <button
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilterRecipes('all');
          } }
          className="h-[70px] xxs:h-[85px] sm:h-[100px]
        w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
        >
          <img
            src={ all }
            alt=""
            className="w-[40px] xxs:w-[55px] sm:w-[70px]"
          />
          <small className="text-[9px] leading-[10px]">All</small>
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            setFilterRecipes('meal');
          } }
          className="h-[70px] xxs:h-[85px] sm:h-[100px]
        w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
        >
          <img
            src={ meal }
            alt=""
            className="w-[40px] xxs:w-[55px] sm:w-[70px]"
          />
          <small className="text-[9px] leading-[10px]">Meals</small>
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            setFilterRecipes('drink');
          } }
          className="h-[70px] xxs:h-[85px] sm:h-[100px]
        w-[40px] xxs:w-[55px] sm:w-[70px] flex flex-col items-center gap-[5px]"
        >
          <img
            src={ drink }
            alt=""
            className="w-[40px] xxs:w-[55px] sm:w-[70px]"
          />
          <small className="text-[9px] leading-[10px]">Drinks</small>
        </button>
      </section>
      <main className="flex flex-wrap justify-center gap-[20px]">

        {doneRecipes?.filter(({ type }) => {
          if (filterRecipes === 'all') return true;
          return type === filterRecipes;
        }).map((recipe, index) => (
          recipe.type === 'meal'
            ? (
              <section
                key={ index }
                className="flex w-[318px] h-[140px] relative mt-[20px] p-0"
              >
                <button
                  type="button"
                  onClick={
                    () => history.push(`/meals/${recipe.id}`)
                  }
                  className=" w-[163.34px] h-full border-0 rounded-l-md"
                >
                  <img
                    alt="icone do botao"
                    key={ index }
                    src={ recipe.image }
                    data-testid={ `${index}-horizontal-image` }
                    className="h-full w-[163.34px] rounded-l-md"

                  />
                </button>
                <section
                  className=" border-[0.52px] border-[#B1B1B1] flex-1
                rounded-r-md flex flex-col"
                >

                  <button
                    onClick={ () => history.push(`/meals/${recipe.id}`) }
                    className="w-full mt-[19px] mb-[5px]"
                  >
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                      className="text-[#1A1B1C] font-bold text-[12px]
                    leading-[13px] text-center m-0"
                    >
                      {recipe.name}

                    </h4>
                  </button>
                  <h3
                    data-testid={ `${index}-horizontal-top-text` }
                    className="leading-[9px] text-[9px] text-[#797D86] text-center"
                  >
                    {`${recipe.nationality} - ${recipe.category}`}

                  </h3>

                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="font-normal text-[9px]
                    leading-[9.23px] w-full text-center mt-[23px] mb-[35px] "
                  >
                    {recipe.doneDate}

                  </p>

                  <button
                    onClick={
                      () => clipboardCopy(`http://localhost:3000/meals/${recipe.id}`).then(() => {
                        setCopied(true);
                      })
                    }
                    className="absolute bottom-0 right-2"
                  >
                    <img
                      style={ { width: '30px' } }
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="icone do botao"
                      src={ shareButton }
                    />
                  </button>
                  {copied && <p>Link copied!</p>}
                  <div className="flex gap-[4px] justify-center items-end ">

                    {recipe.tags.map((tag, indexTag) => (
                      <p
                        key={ indexTag }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        className="bg-[#D9D9D9] h-[14px] rounded-[10px]
                        text-[#797D86] text-[9px] leading-[9.23px]
                        flex justify-center items-center p-1"
                      >
                        {tag}

                      </p>

                    ))}
                  </div>

                </section>

              </section>)
            : (
              <section
                key={ index }
                className="flex w-[318px] h-[140px] relative mt-[20px] p-0"
              >

                <button
                  type="button"
                  onClick={
                    () => history.push(`/drinks/${recipe.id}`)
                  }
                  className="h-full w-[163.34px] rounded-l-md"

                >
                  <img
                    alt="icone do botao"
                    src={ recipe.image }
                    data-testid={ `${index}-horizontal-image` }
                    className="h-full w-[163.34px] rounded-l-md"
                  />
                </button>

                <section
                  className=" border-[0.52px] border-[#B1B1B1] flex-1
                rounded-r-md flex flex-col"
                >
                  <button
                    onClick={ () => history.push(`/drinks/${recipe.id}`) }
                    className="w-full mt-[19px] mb-[5px]"
                  >
                    <h4
                      data-testid={ `${index}-horizontal-name` }
                      className="text-[#1A1B1C] font-bold text-[12px]
                     leading-[13px] text-center m-0"
                    >
                      {recipe.name}

                    </h4>
                  </button>

                  <h3
                    data-testid={ `${index}-horizontal-top-text` }
                    className="leading-[9px] text-[9px] text-[#797D86] text-center"

                  >
                    {recipe.alcoholicOrNot}

                  </h3>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="font-normal text-[9px]
                  leading-[9.23px] w-full text-center mt-[23px] mb-[35px] "
                  >
                    {recipe.doneDate}

                  </p>
                  <button
                    onClick={
                      () => clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`).then(() => {
                        setCopied(true);
                      })
                    }
                    className="absolute bottom-0 right-2"
                  >
                    <img
                      style={ { width: '30px' } }
                      data-testid={ `${index}-horizontal-share-btn` }
                      alt="icone do botao"
                      src={ shareButton }
                    />
                  </button>
                  {copied && <p>Link copied!</p>}
                </section>

              </section>)
        ))}
      </main>

    </div>
  );
}

export default DoneRecipes;

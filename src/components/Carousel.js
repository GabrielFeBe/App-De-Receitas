import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Carousel.css';

const six = 6;
export default function Carousel() {
  const [recommendCard, setRecommendCard] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const pathnameSplited = pathname.split('/');
  const pathnameAfterSplit = pathnameSplited[1];
  const state = useSelector(({ recommend }) => recommend);

  useEffect(() => {
    if (pathnameAfterSplit === 'meals') {
      const sliceRecommendation = state.mealsRecommendation.slice(0, six);
      setRecommendCard(sliceRecommendation);
    } else {
      const sliceRecommendation = state.drinksRecommendation.slice(0, six);
      setRecommendCard(sliceRecommendation);
    }
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathnameAfterSplit]);
  return (
    <section className="w-[250px] smd:w-[335px] m-auto">

      <h2 className="ml-[10px] mt-[35px]">Recommended</h2>
      <div className="carousel ">
        <div
          className="box"
        >
          {recommendCard.map((recomendation, i) => (
            <div key={ i } className="child">
              <img
                src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
                alt=""
                data-testid={ `${i}-recommendation-card` }
              />
              <p data-testid={ `${i}-recommendation-title` }>
                {recomendation.strMeal || recomendation.strDrink}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

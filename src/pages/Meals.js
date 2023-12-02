import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchMeals } from '../services/API';

function Meals() {
  const data = useSelector((state) => state.search.data);
  const [dataToRender, setDataToRender] = useState([]);
  const MAX_INDEX = 12;

  const history = useHistory();
  const dispatch = useDispatch();

  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    dispatch(sendDataAction([]));
  }

  useEffect(() => {
    const fetch = async () => {
      const allData = await fetchMeals();
      setDataToRender(allData);
    };
    fetch();
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {(data.length >= 1 ? data : dataToRender)
        .filter((recipe, index) => index < MAX_INDEX)
        .map((rec, index) => (
          <div
            key={ rec.idMeal }
            data-testid={ `${index}-recipe-card` }
            className="m-3 w-[163px] h-[166px]  border-[#B1B1B1] border-[1px] rounded-xl"
          >
            <button
              onClick={ () => history.push(`/meals/${rec.idMeal}`) }
              className="h-[125px] w-full"
            >

              <img
                src={ rec.strMealThumb }
                alt={ `thumbnail for recipe ${rec.strMeal}` }
                data-testid={ `${index}-card-img` }
                className="h-[125px] w-full rounded-t-xl"

              />

            </button>
            <small
              data-testid={ `${index}-card-name` }
              className="text-xs font-normal pt-[10px]
              pl-[14px] pr-[5px] pb-[9px] w-[142px] text-[#1A1B1C]"
            >
              {rec.strMeal}
            </small>
          </div>
        ))}
      <Footer />
    </div>
  );
}

export default Meals;

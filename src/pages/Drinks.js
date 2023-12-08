import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchDrinks } from '../services/API';

function Drinks() {
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
    const fetchDr = async () => {
      const dataAll = await fetchDrinks();
      setDataToRender(dataAll);
    };
    fetchDr();
  }, []);

  return (
    <>
      <main className="flex flex-wrap items-center justify-center mb-[72px]">

        {(data.length >= 1 ? data : dataToRender)
          .filter((dr, index) => index < MAX_INDEX)
          .map((drink, index) => (
            <section
              key={ drink.idDrink }
              data-testid={ `${index}-recipe-card` }
              className="m-3 w-[163px] h-[166px]
              border-[#B1B1B1] border-[1px] rounded-xl"

            >
              <button
                onClick={ () => history.push(`/drinks/${drink.idDrink}`) }
                className="h-[125px] w-full"

              >

                <img
                  src={ drink.strDrinkThumb }
                  alt={ `thumbnail for recipe ${drink.strDrink}` }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '180px' } }
                  className="h-[125px] w-full rounded-t-xl"

                />

              </button>
              <p
                data-testid={ `${index}-card-name` }
                className="text-xs font-normal pt-[10px] limited-text
            pl-[14px] pr-[5px] pb-[9px] w-[142px] text-[#1A1B1C]"
              >
                {drink.strDrink}
              </p>
            </section>
          ))}
      </main>
      <Footer />
    </>

  );
}

export default Drinks;

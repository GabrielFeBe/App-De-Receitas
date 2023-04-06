import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendDataAction } from '../redux/actions';
import { fetchDrinks } from '../services/API';

function Drinks() {
  const data = useSelector((state) => state.search.data);
  const [dataToRender, setDataToRender] = useState([]);
  const dispatch = useDispatch();
  const MAX_INDEX = 12;

  useEffect(() => {
    const fetchDr = async () => {
      const dataAll = await fetchDrinks();
      setDataToRender(dataAll);
    };
    fetchDr();
  }, []);
  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    dispatch(sendDataAction([]));
  } else {
    return (
      <div>
        <Header />
        {console.log(data, dataToRender)}
        {(data.length >= 1 ? data : dataToRender)
          .filter((dr, index) => index < MAX_INDEX)
          .map((drink, index) => (
            <section key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt={ `thumbnail for recipe ${drink.strDrink}` }
                data-testid={ `${index}-card-img` }
                style={ { width: '180px' } }
              />
              <p data-testid={ `${index}-card-name` }>
                {drink.strDrink}
              </p>
            </section>
          ))}
        <Footer />
      </div>
    );
  }
}

export default Drinks;

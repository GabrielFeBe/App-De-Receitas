import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendDataAction } from '../redux/actions';

function Drinks() {
  const data = useSelector((state) => state.search.data);
  const dispatch = useDispatch();
  const MAX_INDEX = 12;

  if (data === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    dispatch(sendDataAction([]));
  }

  return (
    <div>
      <Header />
      {data && data.filter((recipe, index) => index < MAX_INDEX).map((rec, index) => (
        <section key={ rec.idDrink } data-testid={ `${index}-recipe-card` }>
          <img
            src={ rec.strDrinkThumb }
            alt={ `thumbnail for drink ${rec.strDrink}` }
            data-testid={ `${index}-card-img` }
            style={ { width: '180px' } }
          />
          <p data-testid={ `${index}-card-name` }>
            {rec.strDrink}
          </p>
        </section>
      ))}
      <Footer />
    </div>
  );
}

export default Drinks;

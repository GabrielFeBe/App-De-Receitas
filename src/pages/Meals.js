import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendDataAction } from '../redux/actions';
import { fetchMeals } from '../services/API';

function Meals() {
  const data = useSelector((state) => state.search.data);
  const [dataToRender, setDataToRender] = useState([]);
  const dispatch = useDispatch();
  const MAX_INDEX = 12;

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
    <div>
      <Header />
      {(data.length >= 1 ? data : dataToRender)
        .filter((recipe, index) => index < MAX_INDEX)
        .map((rec, index) => (
          <section key={ rec.idMeal } data-testid={ `${index}-recipe-card` }>
            <Link
              to={ `/meals/${rec.idMeal}` }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <img
                  src={ rec.strMealThumb }
                  alt={ `thumbnail for recipe ${rec.strMeal}` }
                  data-testid={ `${index}-card-img` }
                  style={ { width: '180px' } }
                />
              </div>
            </Link>
            <p data-testid={ `${index}-card-name` }>
              {rec.strMeal}
            </p>
          </section>
        ))}
      <Footer />
    </div>
  );
}

export default Meals;

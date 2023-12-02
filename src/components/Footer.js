import React from 'react';
import './style/Footer.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendDataAction } from '../redux/actions';
import drinkIcon from '../svg/footer/DrinksIcon.svg';
import mealIcon from '../svg/footer/MealsIcon.svg';

export default function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleRedirectDrinks = () => {
    dispatch(sendDataAction([]));
    history.push('/drinks');
  };

  const handleRedirectMeals = () => {
    dispatch(sendDataAction([]));
    history.push('/meals');
  };

  return (
    <footer
      data-testid="footer"
      className="bg-[#41197F] w-full h-[52px] flex justify-between items-center"
    >
      <button
        type="button"
        onClick={ handleRedirectDrinks }
        className="ml-[36px]"
      >
        <img
          data-testid="drinks-bottom-btn"
          alt="Drinks"
          src={ drinkIcon }
        />
      </button>
      <button
        type="button"
        onClick={ handleRedirectMeals }
        className="mr-[36px]"

      >
        <img
          data-testid="meals-bottom-btn"
          alt="Meals"
          src={ mealIcon }
        />
      </button>
    </footer>
  );
}

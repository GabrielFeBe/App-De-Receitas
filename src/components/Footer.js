import React from 'react';
import './style/Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';

import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
    >
      <button
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          alt="Drinks"
          src={ drinkIcon }
        />
      </button>
      <button
        onClick={ () => history.push('/meals') }
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

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const [title, setTitle] = useState('');
  const [hideSearch, setHideSearch] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    switch (pathname) {
    case '/meals':
      setTitle('Meals');
      break;
    case '/drinks':
      setTitle('Drinks');
      break;
    case '/profile':
      setTitle('Profile');
      setHideSearch(true);
      break;
    case '/done-recipes':
      setTitle('Done Recipes');
      setHideSearch(true);
      break;
    case '/favorite-recipes':
      setTitle('Favorite Recipes');
      setHideSearch(true);
      break;

    default:
      break;
    }
  }, []);

  const handleRedirect = () => {
    history.push('/profile');
  };

  const handleToggle = () => {
    setToggleSearchBar(!toggleSearchBar);
  };

  return (
    <div>
      <header>
        <p data-testid="page-title">{title}</p>
        {hideSearch ? (
          <button
            type="button"
            onClick={ handleRedirect }
          >
            <img data-testid="profile-top-btn" src={ profileIcon } alt="icone do botão" />
          </button>
        )
          : (
            <>
              {toggleSearchBar && (
                <input
                  type="text"
                  data-testid="search-input"
                  placeholder="Insira sua busca aqui"
                />
              )}
              <button
                type="button"
                onClick={ handleToggle }
              >
                <img
                  data-testid="search-top-btn"
                  src={ searchIcon }
                  alt="icone do botão"
                />
              </button>
              <button
                type="button"
                onClick={ handleRedirect }
              >
                <img
                  data-testid="profile-top-btn"
                  src={ profileIcon }
                  alt="icone do botão"
                />
              </button>
            </>
          )}
      </header>
    </div>
  );
}

export default Header;

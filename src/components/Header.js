import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import { searchInputAction } from '../redux/actions';
import purpleProf from '../svg/header/profilePurple.svg';
import purpleSearch from '../svg/header/searchPurple.svg';
import logo from '../svg/header/logo.svg';
import icon from '../svg/header/icon.svg';
import meals from '../svg/header/meals.svg';
import drinks from '../svg/header/drinks.svg';
import doneRecipes from '../svg/header/doneRecipes.svg';
import favoriteRecipes from '../svg/header/favorites.svg';
import profile from '../svg/header/profile.svg';

const objSvg = {
  Meals: meals,
  Drinks: drinks,
  'Done Recipes': doneRecipes,
  'Favorite Recipes': favoriteRecipes,
  Profile: profile,

};

function Header() {
  const [title, setTitle] = useState('');
  const [hideSearch, setHideSearch] = useState(false);
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
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
  }, [pathname]);

  useEffect(() => {
    dispatch(searchInputAction(searchInput));
    // expect warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleRedirect = () => {
    history.push('/profile');
  };

  const handleToggle = () => {
    setToggleSearchBar(!toggleSearchBar);
  };

  const handleChange = ({ target }) => {
    setSearchInput(target.value);
  };

  return (
    <div className="mb-[20px]">
      <header className="bg-[#FCDC36] flex h-[52px] justify-between">
        <section className="flex items-center gap-[20px]">

          <img src={ icon } alt="" className="w-[42.6px] h-[39.28px] ml-[26px]" />
          <img src={ logo } alt="" className="w-[109px] h-[17px]" />
        </section>
        <section className="flex items-center gap-[16.15px] mr-[21.29px]">

          {hideSearch ? (
            <button
              type="button"
              onClick={ handleRedirect }
            >
              <img
                data-testid="profile-top-btn"
                src={ purpleProf }
                alt="icone do botão"
                className="w-[28px] h-[28px]"
              />
            </button>
          )
            : (
              <>

                <button
                  type="button"
                  onClick={ handleToggle }
                >
                  <img
                    data-testid="search-top-btn"
                    src={ purpleSearch }
                    alt="icone do botão"
                    className="w-[28px] h-[28px]"

                  />
                </button>
                <button
                  type="button"
                  onClick={ handleRedirect }
                >
                  <img
                    data-testid="profile-top-btn"
                    src={ purpleProf }
                    alt="icone do botão"
                    className="w-[28px] h-[28px]"
                  />
                </button>
              </>
            )}
        </section>

      </header>
      <h1 data-testid="page-title" className="mb-[21px] mt-[31px]">
        <img
          className="w-[147px] h-64px m-auto"
          src={ objSvg[title] }
          alt="Page icon"
        />

      </h1>
      {toggleSearchBar && (
        <div className=" w-[338px] h-[128px] m-auto flex flex-col">
          <input
            type="text"
            value={ searchInput }
            onChange={ (e) => handleChange(e) }
            data-testid="search-input"
            placeholder="Insira sua busca aqui"
            className="border-2 h-[40px] rounded-[5px]
            pl-[17.38px] pt-[13px] pb-[13px] border-[#797D86]"
          />
          <SearchBar />
        </div>
      )}
    </div>
  );
}

export default Header;

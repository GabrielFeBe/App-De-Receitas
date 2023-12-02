import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';
import door from '../svg/profile/door.svg';
import done from '../svg/profile/done.svg';
import heart from '../svg/profile/heart.svg';

function Profile() {
  const [user] = useLocalStorage('user', 'email@email.com');
  const history = useHistory();

  const logoutFunc = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <h2
        data-testid="profile-email"
        className="mt-[20px] font-bold text-center text-[16px] leading-[17px] mb-[41px]"
      >
        {user.email}

      </h2>
      <section className="flex flex-col justify-center items-center">

        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="flex w-[290px] h-[84px] border-b-[1px] items-center"
        >
          <img
            src={ done }
            alt=""
            className="w-[30px] h-[30px] m-[22px]"
          />
          <small>
            Done Recipes
          </small>

        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="flex w-[290px] h-[84px] border-b-[1px] items-center"

        >
          <img
            src={ heart }
            alt=""
            className="w-[30px] h-[30px] m-[22px]"
          />
          <small>

            Favorite Recipes
          </small>

        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => logoutFunc() }
          className="flex w-[290px] h-[84px] items-center"

        >
          <img
            src={ door }
            alt=""
            className="w-[30px] h-[30px] m-[22px]"
          />
          <small>

            Logout
          </small>

        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Profile;

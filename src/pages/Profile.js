import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useLocalStorage from '../hooks/useLocalStorage';

function Profile() {
  const [user] = useLocalStorage('user', 'email@email.com');
  return (
    <div>
      <Header />
      <h1 data-testid="profile-email">{user.email}</h1>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes

      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;

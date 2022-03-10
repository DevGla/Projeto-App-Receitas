import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [stateEmail, setStateEmail] = useState('');

  useEffect(() => { setStateEmail(localStorage.getItem('user')); }, []);

  return (
    <div>
      <Header title="Profile" />
      <p data-testid="profile-email">{stateEmail}</p>
      <Link to="/done-recipes" data-testid="profile-done-btn">Done Recipes</Link>
      <Link
        to="/favorite-recipes"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;

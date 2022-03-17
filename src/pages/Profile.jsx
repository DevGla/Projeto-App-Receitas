import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreCard from '../components/ExploreCard';

function Profile() {
  const history = useHistory();
  const [stateEmail, setStateEmail] = useState('');
  const EMAIL_POSITION = 10;
  useEffect(() => { setStateEmail(localStorage.getItem('user')); }, []);

  return (
    <div className="mt-5 pt-5 mx-3 pb-5">
      <Header title="Profile" />
      <p
        data-testid="profile-email"
        className="text-start text-break"
        style={ { fontSize: '2rem' } }
      >
        {stateEmail
        && stateEmail.length
        && stateEmail.length > 0
        && stateEmail.slice(EMAIL_POSITION, stateEmail.length - 2)}
      </p>
      <button
        type="button"
        data-testid="profile-logout-btn"
        className="btn btn__logout mb-3"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <div className="mb-4">
        <Link to="/done-recipes" data-testid="profile-done-btn">
          <ExploreCard
            title="Done Recipes"
            image="http://assets.stickpng.com/images/5aa78e137603fc558cffbf17.png"
          />
        </Link>
      </div>
      <div className="mb-4">
        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          <ExploreCard
            title="Favorite Recipes"
            image="https://images.unsplash.com/photo-1581022295087-35e593704911?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhcnRzfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          />
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [visibleInput, setVisibleInput] = useState(false);
  const [visibleimage, setVisibleImage] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const { location: { pathname } } = history;
    if (pathname === '/explore'
    || pathname === '/explore/foods'
    || pathname === '/explore/foods/ingredients'
    || pathname === '/explore/drinks'
    || pathname === '/explore/drinks/ingredients'
    || pathname === '/profile'
    || pathname === '/done-recipes'
    || pathname === '/favorite-recipes') {
      setVisibleImage(false);
    }
  }, [history]);

  return (
    <div>
      <h1 data-testid="page-title">Header</h1>
      <Link to="/profile">
        <img src={ profileIcon } alt="profile-icon" data-testid="profile-top-btn" />
      </Link>
      {visibleimage && (
        <div
          role="button"
          tabIndex="0"
          onKeyDown={ () => {} }
          onClick={ () => setVisibleInput((prevVisible) => !prevVisible) }
        >
          <img
            src={ searchIcon }
            alt="page-search"
            data-testid="search-top-btn"
          />

        </div>
      )}
      {visibleInput && (
        <input type="text" data-testid="search-input" />
      )}
    </div>
  );
}

export default Header;
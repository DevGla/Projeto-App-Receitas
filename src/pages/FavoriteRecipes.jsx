import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [filterState, setFilterState] = useState([]);
  useEffect(() => {
    const favoriteRecipe = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavorites(favoriteRecipe);
    setFilterState(favoriteRecipe);
  }, []);
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(filterState));
  }, [filterState]);

  const handleClick = (id) => {
    copy(`http://localhost:3000/foods/${id}`);
    setCopied(true);
  };

  const handleFavorite = (id) => {
    const arrayFavorites = filterState.filter((favorite) => favorite.id !== id.id);
    console.log(arrayFavorites);
    setFilterState(arrayFavorites);
  };

  const filterByType = (type) => {
    switch (type) {
    case 'food':
      setFilterState(favorites.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setFilterState(favorites.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'all':
      setFilterState(favorites);
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <Header title="Favorite Recipes" />
      <Row style={ { marginTop: '125px' } }>
        <Col>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterByType('all') }
          >
            All
          </button>
        </Col>
        <Col>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filterByType('food') }
          >
            Food
          </button>
        </Col>
        <Col>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterByType('drink') }
          >
            Drinks
          </button>
        </Col>
      </Row>
      {filterState.map((recipe, index) => (
        <div
          key={ `${recipe.id}-${index}` }
          className="d-flex flex-column"
        >
          <Link to={ `/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}` }>
            <span
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </span>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              width="100x"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {recipe.type !== 'food' && recipe.alcoholicOrNot}
            {recipe.type === 'food' && (
              recipe.category ? `${recipe.nationality} - ${recipe.category}`
                : recipe.nationality
            )}
          </span>
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ () => handleClick(recipe.id) }
          >
            <img
              src={ shareIcon }
              alt="Compartilhar"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </div>
          {copied && (<span>Link copied!</span>)}
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ () => handleFavorite(recipe) }
          >
            <img
              src={ blackIcon }
              alt="Favoritar"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteRecipes;

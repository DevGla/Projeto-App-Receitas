import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import FavoriteCard from '../components/FavoriteCard';

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

  const handleFavorite = (recipe) => {
    const arrayFavorites = filterState.filter((favorite) => favorite.id !== recipe.id);
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
    <div className="pb-5">
      <Header title="Favorite Recipes" />
      <Row className="mx-2 mt-5 pt-4">
        <Col>
          <button
            className="w-100 button__category overflow-hidden"
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterByType('all') }
          >
            All
          </button>
        </Col>
        <Col>
          <button
            className="w-100 button__category overflow-hidden"
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filterByType('food') }
          >
            Food
          </button>
        </Col>
        <Col>
          <button
            className="w-100 button__category overflow-hidden"
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterByType('drink') }
          >
            Drinks
          </button>
        </Col>
      </Row>
      {filterState.map((recipe, index) => (
        <Row
          key={ `${recipe.id}-${index}` }
          className="favorite__card shadow-lg bg-body rounded mx-3"
        >
          <FavoriteCard
            index={ index }
            recipe={ recipe }
            copied={ copied }
            handleClick={ handleClick }
            handleFavorite={ handleFavorite }
            shareIcon={ shareIcon }
            blackIcon={ blackIcon }
          />
        </Row>
      ))}
    </div>
  );
}

export default FavoriteRecipes;

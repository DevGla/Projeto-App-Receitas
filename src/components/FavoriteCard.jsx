/* eslint-disable react/jsx-curly-spacing */
import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FavoriteCard(props) {
  const {
    index, recipe, copied, handleFavorite, handleClick, shareIcon, blackIcon,
  } = props;
  return (
    <>
      <Col xs="6" className="p-0">
        <Link to={`/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}`}>
          <img
            src={recipe.image}
            alt={recipe.name}
            width="100%"
            data-testid={`${index}-horizontal-image`}
          />
        </Link>
      </Col>
      <Col xs="6" className="position-relative">
        <span
          className="d-block w-100 recipe__category mt-2"
          data-testid={`${index}-horizontal-top-text`}
        >
          {recipe.type !== 'food' && recipe.alcoholicOrNot}
          {recipe.type === 'food' && (
            recipe.category ? `${recipe.nationality} - ${recipe.category}`
              : recipe.nationality
          )}
        </span>
        <Link to={`/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}`}>
          <span
            className="recipe__name--big w-100"
            data-testid={`${index}-horizontal-name`}
          >
            {recipe.name}
          </span>
        </Link>
        <div className="d-flex position-absolute recipe__group-button">
          <div
            role="button"
            tabIndex="0"
            onKeyDown={() => { }}
            onClick={() => handleClick(recipe.id)}
          >
            <img
              src={shareIcon}
              alt="Compartilhar"
              data-testid={`${index}-horizontal-share-btn`}
            />
          </div>
          {copied && (<span>Link copied!</span>)}
          <div
            role="button"
            tabIndex="0"
            className="mx-4"
            onKeyDown={() => { }}
            onClick={() => handleFavorite(recipe)}
          >
            <img
              src={blackIcon}
              alt="Favoritar"
              data-testid={`${index}-horizontal-favorite-btn`}
            />
          </div>
        </div>
      </Col>
    </>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.object,
  copied: PropTypes.bool,
  handleFavorite: PropTypes.func,
  handleClick: PropTypes.func,
  blackIcon: PropTypes.string,
}.isRequired;

export default FavoriteCard;

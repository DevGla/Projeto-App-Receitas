import React from 'react';
import PropTypes from 'prop-types';
import '../style/RecipesCard.css';

function RecipesCard({ recipe, index, type }) {
  return (
    <div
      className="card recipes-card shadow mb-5 bg-body rounded"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        width="100%"
        data-testid={ `${index}-card-img` }
        src={ recipe[`str${type}Thumb`] }
        className="card-img-top recipes-card__image"
        alt=""
      />
      <p
        data-testid={ `${index}-card-name` }
        className="card-text p-2 recipes-card__title"
      >
        { recipe[`str${type}`] }
      </p>
    </div>
  );
}

RecipesCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipesCard;

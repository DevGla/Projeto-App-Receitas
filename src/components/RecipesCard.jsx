import React from 'react';
import PropTypes from 'prop-types';

function RecipesCard({ recipe, index, type }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        width="100%"
        data-testid={ `${index}-card-img` }
        src={ recipe[`str${type}Thumb`] }
        alt=""
      />
      <p data-testid={ `${index}-card-name` }>{ recipe[`str${type}`] }</p>
    </div>
  );
}

RecipesCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipesCard;

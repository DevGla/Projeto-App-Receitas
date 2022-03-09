import React from 'react';
import PropTypes from 'prop-types';

function RecomendationCard({ recipe, index, type }) {
  return (
    <div data-testid={ `${index}-recomendation-card` } className="rec">
      <img src={ recipe[`str${type}Thumb`] } alt="" />
      <p data-testid={ `${index}-recomendation-title` }>{ recipe[`str${type}`] }</p>
    </div>
  );
}

RecomendationCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default RecomendationCard;

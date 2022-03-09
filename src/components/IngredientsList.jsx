import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ recipe }) {
  const ingredients = Object.entries(recipe)
    .filter((e) => e[0].includes('strIngredient') && e[1]);
  const measures = Object.entries(recipe)
    .filter((e) => e[0].includes('strMeasure') && e[1]);

  return (
    <div>
      {ingredients.map((e, index) => (
        <p
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`- ${e[1]} - ${measures[index][1]}`}
        </p>
      ))}
    </div>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsList;

import React from 'react';
import PropTypes from 'prop-types';

function IngredientsList({ recipe = [] }) {
  const ingredients = Object.entries(recipe)
    .filter((e) => e[0].includes('strIngredient') && e[1]);
  const measures = Object.entries(recipe)
    .filter((e) => e[0].includes('strMeasure') && e[1]);

  function handleNull(arr, index) {
    if (arr[index]) {
      return arr[index][1];
    }
    return ' n/a';
  }

  return (
    <div className="bg__recipe-details">
      {ingredients.length > 0 && (
        ingredients.map((e, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`- ${e[1]} - ${handleNull(measures, index)}`}
          </p>
        ))
      )}
    </div>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientsList;

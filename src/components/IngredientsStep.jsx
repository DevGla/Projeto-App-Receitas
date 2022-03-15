import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientsStep({ recipe, type, id, set }) {
  const ingredients = Object.entries(recipe)
    .filter((e) => e[0].includes('strIngredient') && e[1]);
  const measures = Object.entries(recipe)
    .filter((e) => e[0].includes('strMeasure') && e[1]);

  let test = [];
  let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (local && ingredients.length !== 0 && type === 'meals') {
    test = local.meals[id];
    if (local.meals[id].length === ingredients.length) set(false);
  } else if (local && ingredients.length !== 0 && type === 'drinks') {
    test = local.cocktails[id];
    if (local.cocktails[id].length === ingredients.length) set(false);
  }
  const [used, setUsed] = useState(test);

  const handleClick = ({ target }) => {
    local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local) local = { cocktails: {}, meals: {} };
    if (type === 'meals') {
      let array = local.meals[id];
      if (!array) array = [];
      const check = array.some((e) => e === target.id);
      if (!check) {
        const newArray = [...array, target.id];
        local.meals[id] = newArray;
        localStorage.setItem('inProgressRecipes', JSON.stringify(local));
      }
    } else if (type === 'drinks') {
      let array = local.cocktails[id];
      if (!array) array = [];
      const check = array.some((e) => e === target.id);
      if (!check) {
        const newArray = [...array, target.id];
        local.cocktails[id] = newArray;
        localStorage.setItem('inProgressRecipes', JSON.stringify(local));
      }
    }
    setUsed([...used, target.id]);
    if (used.length >= ingredients.length - 1) set(false);
  };

  useEffect(() => {
    local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local && ingredients.length !== 0 && type === 'meals') {
      setUsed(local.meals[id]);
      if (local.meals[id].length === ingredients.length) set(false);
    } else if (local && ingredients.length !== 0 && type === 'drinks') {
      setUsed(local.cocktails[id]);
      if (local.cocktails[id].length === ingredients.length) set(false);
    }
  }, [recipe]);

  return (
    <div>
      {ingredients.map((e, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            type="checkbox"
            id={ index }
            onClick={ handleClick }
            checked={ used.some((el) => Number(el) === index) }
          />
          {measures[index]
            ? <label htmlFor={ index }>{`${e[1]} - ${measures[index][1]}`}</label>
            : <label htmlFor={ index }>{`${e[1]}`}</label>}
        </div>
      ))}
    </div>
  );
}

IngredientsStep.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  set: PropTypes.func.isRequired,
};

export default IngredientsStep;

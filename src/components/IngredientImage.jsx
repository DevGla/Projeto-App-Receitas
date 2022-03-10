import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';

function IngredientImage({ type, ingredient, index }) {
  const history = useHistory();
  const { setFilterByIngredient } = useContext(RecipesContext);

  const ingredientName = type === 'meal' ? (
    ingredient.strIngredient) : (ingredient.strIngredient1);

  const redirectRouteWithParam = () => {
    setFilterByIngredient(ingredientName);
    history.push(type === 'meal' ? '/foods' : '/drinks');
  };

  return (
    <section
      data-testid={ `${index}-ingredient-card` }
      onClick={ redirectRouteWithParam }
      role="button"
      tabIndex="0"
      onKeyDown={ () => { } }
    >
      <span data-testid={ `${index}-card-name` }>{ ingredientName }</span>
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.the${type}db.com/images/ingredients/${ingredientName}-Small.png` }
        width="100px"
        height="100px"
        style={ { objectFit: 'cover', objectPosition: 'center' } }
        alt={ `foto do ingredient ${ingredient.strIngredient}` }
      />
    </section>
  );
}

IngredientImage.propTypes = {
  type: PropTypes.string,
  ingredient: PropTypes.objectOf(PropTypes.string),
  index: PropTypes.number,
}.isRequired;

export default IngredientImage;

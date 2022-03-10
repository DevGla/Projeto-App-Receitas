import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import copy from 'clipboard-copy';
import { fetchingDrinkId } from '../services';
import IngredientsStep from '../components/IngredientsStep';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DrinkInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const checkFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local) {
      const check = local.some((e) => e.id === id);
      setFavorite(check);
    }
  };

  const handleShare = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setCopied(true);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    if (local) localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  };

  const handleClick = () => {
    history.push('/done-recipes');
  };

  useEffect(() => {
    fetchingDrinkId(id, setRecipe);
    checkFavorite();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="" />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <div role="button" tabIndex="0" onKeyDown={ () => {} } onClick={ handleShare }>
        <img src={ shareIcon } alt="" data-testid="share-btn" />
      </div>
      {copied && (<span>Link copied!</span>)}
      <div role="button" tabIndex="0" onKeyDown={ () => {} } onClick={ handleFavorite }>
        <img
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
          data-testid="favorite-btn"
        />
      </div>
      <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
      <IngredientsStep recipe={ recipe } type="drinks" id={ id } set={ setIsDisabled } />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default DrinkInProgress;

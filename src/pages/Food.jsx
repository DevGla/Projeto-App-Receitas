import React, { useEffect, useState } from 'react';
import '../style/Food.css';
import { useHistory, useParams } from 'react-router';
import copy from 'clipboard-copy';
import IngredientsList from '../components/IngredientsList';
import RecomendationCard from '../components/RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchingId, fetchingRecomendation } from '../services';

function Food() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgres] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const FIVE = 5;

  const checkDone = () => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    if (local) {
      const check = local.some((e) => e.id === id);
      setDone(check);
    }
  };

  const checkInProgress = () => {
    const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (local) {
      const check = Object.keys(local.meals).some((e) => e === id);
      setInProgres(check);
    }
  };

  const checkFavorite = () => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (local) {
      const check = local.some((e) => e.id === id);
      setFavorite(check);
    }
  };

  const handleClick = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/foods/${id}`);
    setCopied(true);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const obj = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    if (local) localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  };

  useEffect(() => {
    fetchingId(id, setRecipe);
    fetchingRecomendation(setRecomendation);
    checkDone();
    checkInProgress();
    checkFavorite();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strMealThumb } alt="" />
      <h1 data-testid="recipe-title">{ recipe.strMeal }</h1>
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
      <p data-testid="recipe-category">{ recipe.strCategory }</p>
      <IngredientsList recipe={ recipe } />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        width="420"
        height="315"
        src={ recipe.strYoutube }
        title={ recipe.strMeal }
        data-testid="video"
      />
      <div className="all-rec">
        {recomendation.map((e, index) => {
          if (index <= FIVE) {
            return (<RecomendationCard
              key={ index }
              recipe={ e }
              index={ index }
              type="Drink"
            />);
          }
          return null;
        })}
      </div>
      {!done
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="startBtn"
          onClick={ handleClick }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </div>
  );
}

export default Food;

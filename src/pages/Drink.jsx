import React, { useEffect, useState } from 'react';
import '../style/Food.css';
import { useHistory, useParams } from 'react-router';
import copy from 'clipboard-copy';
import IngredientsList from '../components/IngredientsList';
import RecomendationCard from '../components/RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function Drink() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgres] = useState(false);
  const [copied, setCopied] = useState(false);
  const FIVE = 5;

  const fetchingId = async (string) => {
    try {
      const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${string}`);
      const result = await data.json();
      setRecipe(result.drinks[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchingRecomendation = async () => {
    try {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await data.json();
      setRecomendation(result.meals);
    } catch (error) {
      console.error(error);
    }
  };

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
      const check = Object.keys(local.cocktails).some((e) => e === id);
      setInProgres(check);
    }
  };

  const handleClick = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  const handleShare = () => {
    copy(`http://localhost:3000/drinks/${id}`);
    setCopied(true);
  };

  useEffect(() => {
    fetchingId(id);
    fetchingRecomendation();
    checkDone();
    checkInProgress();
  }, []);

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipe.strDrinkThumb } alt="" />
      <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
      <div role="button" tabIndex="0" onKeyDown={ () => {} } onClick={ handleShare }>
        <img src={ shareIcon } alt="" data-testid="share-btn" />
      </div>
      {copied && (<span>Link copied!</span>)}
      <div role="button">
        <img src={ whiteHeartIcon } alt="" data-testid="favorite-btn" />
      </div>
      <p data-testid="recipe-category">{ recipe.strAlcoholic }</p>
      <IngredientsList recipe={ recipe } />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <div className="all-rec">
        {recomendation.map((e, index) => {
          if (index <= FIVE) {
            return (<RecomendationCard
              key={ index }
              recipe={ e }
              index={ index }
              type="Meal"
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

export default Drink;

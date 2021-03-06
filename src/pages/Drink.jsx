import React, { useEffect, useState } from 'react';
import '../style/Food.css';
import { Col, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import copy from 'clipboard-copy';
import IngredientsList from '../components/IngredientsList';
import RecomendationCard from '../components/RecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchingDrinkId, fetchingDrinkRecomendation,
  checkDone, checkInProgressDrink, checkFavorite } from '../services';

function Drink() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [done, setDone] = useState(false);
  const [inProgress, setInProgres] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const FIVE = 5;

  const handleClick = () => {
    let local = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!local) local = { cocktails: { [id]: [] }, meals: {} };
    else if (!local.cocktails[id]) local.cocktails[id] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(local));
    history.push(`/drinks/${id}/in-progress`);
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
    if (local && local.some((e) => e.id === obj.id)) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(local
        .filter((e) => e.id !== obj.id)));
    } else if (local) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...local, obj]));
    } else localStorage.setItem('favoriteRecipes', JSON.stringify([obj]));
  };

  useEffect(() => {
    fetchingDrinkId(id, setRecipe);
    fetchingDrinkRecomendation(setRecomendation);
    checkDone(id, setDone);
    checkInProgressDrink(id, setInProgres);
    checkFavorite(id, setFavorite);
  }, []);

  return (
    <div className="pb-5">
      <img
        className="w-100"
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb }
        alt=""
      />
      <Row className="mt-2 mx-0">
        <Col xs="8">
          <h1 className="mb-0" data-testid="recipe-title">{ recipe.strDrink }</h1>
          <p className="mx-1" data-testid="recipe-category">{ recipe.strAlcoholic }</p>
        </Col>
        <Col xs="4" className="d-flex justify-content-around">
          <div role="button" tabIndex="0" onKeyDown={ () => {} } onClick={ handleShare }>
            <img src={ shareIcon } alt="" data-testid="share-btn" />
          </div>
          {copied && (<span>Link copied!</span>)}
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ handleFavorite }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt=""
              data-testid="favorite-btn"
            />
          </div>
        </Col>
      </Row>
      <div className="mx-3">
        <div>
          <h2>Ingredients</h2>
          <IngredientsList recipe={ recipe } />
        </div>
        <h2>Instructions</h2>
        <p
          className="mt-2 text-justify"
          data-testid="instructions"
        >
          {recipe.strInstructions}
        </p>
      </div>
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
          className="startBtn w-100 btn btn-start-recipe"
          onClick={ handleClick }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>)}
    </div>
  );
}

export default Drink;

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import copy from 'clipboard-copy';
import { Col, Row } from 'react-bootstrap';
import { fetchingId } from '../services';
import IngredientsStep from '../components/IngredientsStep';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodInProgress() {
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

  const handleClick = () => {
    let local = JSON.parse(localStorage.getItem('doneRecipes'));
    let tags = [];
    if (recipe.strTags) {
      tags = recipe.strTags.split(', ');
    }
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;
    const obj = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
      doneDate: today,
      tags,
    };
    if (!local) local = [];
    localStorage.setItem('doneRecipes', JSON.stringify([...local, obj]));
    history.push('/done-recipes');
  };

  useEffect(() => {
    fetchingId(id, setRecipe);
    checkFavorite();
  }, []);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb }
        alt=""
        className="w-100"
      />
      <Row className="mt-2 mx-0">
        <Col xs="8">
          <h1 className="mb-0 mx-3" data-testid="recipe-title">{ recipe.strMeal }</h1>
          <p className="mx-3" data-testid="recipe-category">{ recipe.strCategory }</p>
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
          <div className="bg__recipe-details">
            <IngredientsStep
              recipe={ recipe }
              type="meals"
              id={ id }
              set={ setIsDisabled }
            />
          </div>
        </div>
        <h2>Instructions</h2>
        <p
          className="mt-2 text-justify"
          data-testid="instructions"
        >
          {recipe.strInstructions}
        </p>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        className="w-100 btn btn-start-recipe"
        onClick={ handleClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default FoodInProgress;

import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filterState, setFilterState] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setState(local);
    setFilterState(local);
  }, []);

  const handleShare = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  const filterByType = (type) => {
    switch (type) {
    case 'food':
      setFilterState(state.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setFilterState(state.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'all':
      setFilterState(state);
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <Row style={ { marginTop: '125px' } }>
        <Col>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => filterByType('all') }
          >
            All
          </button>
        </Col>
        <Col>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => filterByType('food') }
          >
            Food
          </button>
        </Col>
        <Col>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterByType('drink') }
          >
            Drinks
          </button>
        </Col>
      </Row>
      {filterState.map((recipe, index) => (
        <div key={ index }>
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              src={ recipe.image }
              alt=""
              width="100px"
              data-testid={ `${index}-horizontal-image` }
            />
          </div>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'food'
              ? (`${recipe.nationality} - ${recipe.category}`) : (
                recipe.alcoholicOrNot) }
          </p>
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            data-testid={ `${index}-horizontal-name` }
            onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
          >
            {recipe.name}
          </div>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <div
            role="button"
            tabIndex="0"
            onKeyDown={ () => {} }
            onClick={ () => handleShare(recipe.id, recipe.type) }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </div>
          {copied && (<span>Link copied!</span>)}
          {recipe.tags.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;

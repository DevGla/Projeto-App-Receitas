import React from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

function DoneCard(props) {
  const { index, recipe, copied, handleShare, shareIcon } = props;
  const history = useHistory();
  return (
    <>
      <Col
        xs="6"
        role="button"
        tabIndex="0"
        className="border p-0"
        onKeyDown={ () => {} }
        onClick={ () => history.push(`/${recipe.type}s/${recipe.id}`) }
      >
        <img
          src={ recipe.image }
          alt=""
          className="w-100 h-100 recipe__image"
          data-testid={ `${index}-horizontal-image` }
        />
      </Col>
      <Col xs="6" className="px-2 position-relative">
        <p
          className="recipe__category m-0"
          data-testid={ `${index}-horizontal-top-text` }
        >
          {recipe.type === 'food'
            ? (`${recipe.nationality} - ${recipe.category}`) : (
              recipe.alcoholicOrNot) }
        </p>
        <div
          role="button"
          tabIndex="0"
          className="recipe__name"
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
          className="position-absolute btn__share"
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
          <p
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
            className="rounded-pill px-2 bg__color-theme recipe__tag"
          >
            {tag}
          </p>
        ))}
      </Col>
    </>
  );
}

DoneCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.object,
  copied: PropTypes.bool,
  handleShare: PropTypes.func,
}.isRequired;

export default DoneCard;

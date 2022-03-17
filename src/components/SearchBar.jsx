import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ type }) {
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState('');
  const { setResults } = useContext(RecipesContext);
  const history = useHistory();

  const handleAlert = (obj) => {
    switch (type) {
    case 'meal':
      if (obj.meals === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      break;
    case 'cocktail':
      if (obj.drinks === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      break;
    default:
      break;
    }
  };

  const handleSearch = async () => {
    try {
      let { data, result } = [];
      switch (searching) {
      case 'ingredient':
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/filter.php?i=${searchInput}`);
        result = await data.json();
        setResults(result);
        break;
      case 'name':
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?s=${searchInput}`);
        result = await data.json();
        setResults(result);
        break;
      case 'first-letter':
        if (searchInput.length > 1) {
          global.alert('Your search must have only 1 (one) character');
        }
        data = await fetch(`https://www.the${type}db.com/api/json/v1/1/search.php?f=${searchInput}`);
        result = await data.json();
        setResults(result);
        break;
      default:
        break;
      }
      handleAlert(result);
      if (type === 'meal' && result.meals.length === 1) {
        history.push(`/foods/${result.meals[0].idMeal}`);
      } else if (type === 'cocktail' && result.drinks.length === 1) {
        history.push(`/drinks/${result.drinks[0].idDrink}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="mx-auto">
      <Row>
        <Col xs="8">
          <input
            type="text"
            data-testid="search-input"
            value={ searchInput }
            onChange={ ({ target }) => setSearchInput(target.value) }
            className="form-control"
          />
        </Col>
        <Col xs="4">
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ handleSearch }
            className="btn btn-light border-"
          >
            Search
          </button>
        </Col>
      </Row>
      <Row className="mx-auto mt-2">
        <Col xs="4">
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searching"
              value="ingredient"
              className="form-check-input"
              data-testid="ingredient-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            Ingredient
          </label>
        </Col>
        <Col xs="4">
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searching"
              value="name"
              className="form-check-input"
              data-testid="name-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            Name
          </label>
        </Col>
        <Col xs="4" className="px-0">
          <label htmlFor="first-letter">
            <input
              type="radio"
              id="first-letter"
              name="searching"
              value="first-letter"
              className="form-check-input"
              data-testid="first-letter-search-radio"
              onClick={ ({ target }) => setSearching(target.value) }
            />
            First Letter
          </label>
        </Col>
      </Row>
    </Container>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;

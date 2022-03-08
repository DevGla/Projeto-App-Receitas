import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ type }) {
  const [searchInput, setSearchInput] = useState('');
  const [searching, setSearching] = useState('');
  const { setResults } = useContext(RecipesContext);
  const history = useHistory();

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
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <label htmlFor="ingredient">
        <input
          type="radio"
          id="ingredient"
          name="searching"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onClick={ ({ target }) => setSearching(target.value) }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          name="searching"
          value="name"
          data-testid="name-search-radio"
          onClick={ ({ target }) => setSearching(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          id="first-letter"
          name="searching"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onClick={ ({ target }) => setSearching(target.value) }
        />
        First Letter
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;

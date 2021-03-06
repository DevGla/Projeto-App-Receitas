import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [results, setResults] = useState({});
  const [searched, setSearched] = useState(false);
  const [filterByIngredient, setFilterByIngredient] = useState('');

  const context = {
    results,
    setResults,
    searched,
    setSearched,
    filterByIngredient,
    setFilterByIngredient,
  };

  return (
    <RecipesContext.Provider value={ context }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

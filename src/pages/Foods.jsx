import React, { useContext } from 'react';
import RecipesCard from '../components/RecipesCard';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const { results } = useContext(RecipesContext);
  const ELEVEN = 11;

  return (
    <div>
      <button type="button" data-testid="search-top-btn">Search</button>
      <SearchBar type="meal" />
      {results.meals && results.meals
        .map((e, index) => {
          if (index <= ELEVEN) {
            return (<RecipesCard
              key={ e.idMeal }
              recipe={ e }
              index={ index }
              type="Meal"
            />);
          }
          return null;
        })}
    </div>
  );
}

export default Foods;

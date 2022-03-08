import React, { useContext } from 'react';
import RecipesCard from '../components/RecipesCard';
import SearchBar from '../components/SearchBar';
import RecipesContext from '../context/RecipesContext';

function Drinks() {
  const { results } = useContext(RecipesContext);
  const ELEVEN = 11;

  return (
    <div>
      <button type="button" data-testid="search-top-btn">Search</button>
      <SearchBar type="cocktail" />
      {results.drinks && results.drinks
        .map((e, index) => {
          if (index <= ELEVEN) {
            return (<RecipesCard
              key={ e.idDrink }
              recipe={ e }
              index={ index }
              type="Drink"
            />);
          }
          return null;
        })}
    </div>
  );
}

export default Drinks;

import React, { useContext } from 'react';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { results } = useContext(RecipesContext);
  const ELEVEN = 11;

  return (
    <div>
      <Header type="cocktail" />
      <h1 data-testid="page-title">Drinks</h1>
      {/* <button type="button" data-testid="search-top-btn">Search</button> */}
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

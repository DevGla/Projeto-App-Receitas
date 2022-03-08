import React, { useContext } from 'react';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Foods() {
  const { results } = useContext(RecipesContext);
  const ELEVEN = 11;

  return (
    <div>
      <h1 data-testid="page-title">Foods</h1>
      <Header type="meal" />
      {/* <button type="button" data-testid="search-top-btn">Search</button> */}
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

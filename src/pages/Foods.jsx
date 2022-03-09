import React, { useContext } from 'react';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods() {
  const { results } = useContext(RecipesContext);
  const ELEVEN = 11;

  return (
    <div>
      <h1 data-testid="page-title">Foods</h1>
      <Header type="meal" />
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
      <Footer />
    </div>
  );
}

export default Foods;

import React, { useContext, useEffect } from 'react';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRecipe } from '../services';

function Foods() {
  const { results, setResults } = useContext(RecipesContext);
  const ELEVEN = 11;

  useEffect(() => {
    fetchRecipe('meal')
      .then((recipes) => setResults(recipes));
  }, [setResults]);

  function onlyTwelveRecipes(meal, index) {
    if (index <= ELEVEN) {
      return (
        <RecipesCard
          key={ meal.idMeal }
          recipe={ meal }
          index={ index }
          type="Meal"
        />
      );
    }
    return null;
  }

  return (
    <div>
      <h1 data-testid="page-title">Foods</h1>
      <Header type="meal" />
      {results.meals && results.meals
        .map((meal, index) => (
          onlyTwelveRecipes(meal, index)
        ))}
      <Footer />
    </div>
  );
}

export default Foods;

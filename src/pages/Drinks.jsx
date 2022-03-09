import React, { useContext, useEffect } from 'react';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRecipe } from '../services';

function Drinks() {
  const { results, setResults } = useContext(RecipesContext);
  const ELEVEN = 11;

  useEffect(() => {
    fetchRecipe('cocktail')
      .then((recipes) => setResults(recipes));
  }, [setResults]);

  function onlyTwelveRecipes(cocktail, index) {
    if (index <= ELEVEN) {
      return (<RecipesCard
        key={ cocktail.idDrink }
        recipe={ cocktail }
        index={ index }
        type="Drink"
      />);
    }
    return null;
  }

  return (
    <div>
      <Header type="cocktail" />
      <h1 data-testid="page-title">Drinks</h1>
      {results.drinks && results.drinks
        .map((cocktail, index) => (
          onlyTwelveRecipes(cocktail, index)
        ))}
      <Footer />
    </div>
  );
}

export default Drinks;

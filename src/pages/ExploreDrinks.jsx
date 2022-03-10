import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  const history = useHistory();
  const requestAndRedirect = async () => {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await data.json();
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" />
      <Link
        to="/explore/drinks/ingredients"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ requestAndRedirect }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;

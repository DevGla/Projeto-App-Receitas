import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const requestAndRedirect = async () => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await data.json();
    console.log(meals[0].idMeal);
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <div>
      <Header />
      <h1 data-testid="page-title">Explore Foods</h1>
      <Link
        to="/explore/foods/ingredients"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </Link>
      <Link
        to="/explore/foods/nationalities"
        data-testid="explore-by-nationality"
      >
        By Nationality
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

export default ExploreFoods;

import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreCard from '../components/ExploreCard';

function ExploreFoods() {
  const history = useHistory();
  const requestAndRedirect = async () => {
    const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const { meals } = await data.json();
    console.log(meals[0].idMeal);
    history.push(`/foods/${meals[0].idMeal}`);
  };

  return (
    <div className="mt-5 pt-4 px-4 pb-5">
      <Header title="Explore Foods" />
      <div className="my-4">
        <Link
          to="/explore/foods/ingredients"
          data-testid="explore-by-ingredient"
          className="my-4"
        >
          <ExploreCard
            title="By Ingredient"
            image="https://post.healthline.com/wp-content/uploads/2020/09/healthy-eating-ingredients-732x549-thumbnail.jpg"
          />
        </Link>
      </div>
      <div className="my-4">
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-by-nationality"
        >
          <ExploreCard
            title="By Nationality"
            image="https://static6.depositphotos.com/1011646/553/i/950/depositphotos_5534989-stock-photo-various-country-buttons.jpg"
          />
        </Link>
      </div>
      <div className="my-4">
        <button
          type="button"
          className="border-0 bg-transparent px-0"
          data-testid="explore-surprise"
          onClick={ requestAndRedirect }
        >
          <ExploreCard
            title="Surprise me!"
            image="https://imagensemoldes.com.br/wp-content/uploads/2020/07/Conjunto-Interroga%C3%A7%C3%A3o-PNG-1024x512.png"
          />
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;

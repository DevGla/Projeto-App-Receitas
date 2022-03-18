import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreCard from '../components/ExploreCard';

function ExploreDrinks() {
  const history = useHistory();
  const requestAndRedirect = async () => {
    const data = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const { drinks } = await data.json();
    history.push(`/drinks/${drinks[0].idDrink}`);
  };

  return (
    <div className="mt-5 pt-5 px-3 mb-0">
      <Header title="Explore Drinks" />
      <Link
        to="/explore/drinks/ingredients"
        data-testid="explore-by-ingredient"
      >
        <ExploreCard
          title="By Ingredient"
          image="https://www.emporiomuseudagula.com.br/media/cache/07/40/074019677c6c0ef29f7a436eaaf2136d.jpg"
        />
      </Link>
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
      <Footer />
    </div>
  );
}

export default ExploreDrinks;

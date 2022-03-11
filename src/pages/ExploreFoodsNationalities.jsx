import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchNationalities,
  fetchRecipe,
  fetchRecipeByNationality } from '../services';
import RecipesCard from '../components/RecipesCard';

function ExploreFoodsNationalities() {
  const [nationatilies, setNationatilies] = useState([]);
  const [recipeList, setRecipeList] = useState([]);
  const ELEVEN = 11;

  useEffect(() => {
    fetchNationalities('meal')
      .then((data) => {
        const arrNationalities = data.meals;
        const isAllExist = arrNationalities
          .some((nationality) => nationality.strArea === 'All');
        if (!isAllExist) {
          arrNationalities.unshift({ strArea: 'All' });
        }
        setNationatilies(arrNationalities);
      });

    fetchRecipe('meal')
      .then((recipes) => {
        const arr = recipes.meals.slice(0, ELEVEN + 1);
        setRecipeList(arr);
      });
  }, []);

  const filterByNationatity = ({ target: { value } }) => {
    if (value === 'All') {
      fetchRecipe('meal')
        .then((recipes) => {
          const arr = recipes.meals.slice(0, ELEVEN + 1);
          setRecipeList(arr);
        });
    } else {
      fetchRecipeByNationality('meal', value)
        .then((data) => {
          const arr = data.meals.slice(0, ELEVEN + 1);
          console.log(arr);
          setRecipeList(arr);
        });
    }
  };

  return (
    <>
      <Header title="Explore Nationalities" />
      <select
        aria-label="Default select example"
        data-testid="explore-by-nationality-dropdown"
        onChange={ filterByNationatity }
      >
        {nationatilies.length > 0 && nationatilies.map((nationality) => (
          <option
            key={ nationality.strArea }
            data-testid={ `${nationality.strArea}-option` }
            value={ nationality.strArea }
          >
            { nationality.strArea }
          </option>
        ))}
      </select>
      { recipeList.length > 0 && recipeList.map((recipe, index) => (
        <div key={ Math.random() }>
          {
            recipe.strMealThumb ? (
              <Link to={ `/foods/${recipe.idMeal}` }>
                <RecipesCard
                  key={ recipe.idMeal }
                  recipe={ recipe }
                  index={ index }
                  type="Meal"
                />
              </Link>
            ) : (
              <RecipesCard
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
                type="Meal"
              />
            )
          }
        </div>
      ))}
      <Footer />
    </>
  );
}

export default ExploreFoodsNationalities;

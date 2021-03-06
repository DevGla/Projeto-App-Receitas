import React, { useContext, useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRecipe, fetchRecipeCategories,
  fetchFilterByCategories, fetchRecipeByIngredient,
} from '../services';
import ButtonCategory from '../components/ButtonCategory';

function Drinks() {
  const { results, setResults, filterByIngredient } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const ELEVEN = 11;

  const MAX_CATEGORIES = 5;

  useEffect(() => {
    fetchRecipeCategories('cocktail')
      .then((recipeCategories) => {
        const arrCategories = recipeCategories.drinks.slice(0, MAX_CATEGORIES);
        arrCategories.unshift({ strCategory: 'All' });
        setCategories(arrCategories);
      });
  }, []);

  useEffect(() => {
    if (filterByIngredient.length !== 0) {
      fetchRecipeByIngredient('cocktail', filterByIngredient)
        .then((recipes) => {
          setResults(recipes);
        })
        .catch((error) => console.log(error));
    } else {
      fetchRecipe('cocktail')
        .then((recipes) => setResults(recipes));
    }
  }, [setResults, filterByIngredient]);

  const filterByCategory = (category) => {
    if (category === 'All') {
      fetchRecipe('cocktail')
        .then((recipes) => setResults(recipes));
    } else {
      fetchFilterByCategories('cocktail', category)
        .then((recipes) => setResults(recipes))
        .catch((error) => console.log(error));
    }
  };

  function onlyTwelveRecipes(cocktail, index) {
    if (index <= ELEVEN) {
      return (
        <Link key={ cocktail.idDrink } to={ `/drinks/${cocktail.idDrink}` }>
          <RecipesCard
            key={ cocktail.idDrink }
            recipe={ cocktail }
            index={ index }
            type="Drink"
          />
        </Link>
      );
    }
    return null;
  }

  return (
    <Container fluid className="pb-5">
      <Header type="cocktail" title="Drinks" />
      <Row className="mt-5 py-4">
        {categories.length > 0 && categories.map((category) => (
          <Col xs="6" as="section" key={ category.strCategory }>
            <ButtonCategory
              category={ category.strCategory }
              filterBy={ filterByCategory }
            />
          </Col>
        ))}
      </Row>
      {results.drinks && results.drinks
        .map((cocktail, index) => (
          onlyTwelveRecipes(cocktail, index)
        ))}
      <Footer />
    </Container>
  );
}

export default Drinks;

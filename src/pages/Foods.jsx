import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchFilterByCategories, fetchRecipe, fetchRecipeCategories } from '../services';
import ButtonCategory from '../components/ButtonCategory';

function Foods() {
  const { results, setResults } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const ELEVEN = 11;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    fetchRecipeCategories('meal')
      .then((recipeCategories) => {
        const arrCategories = recipeCategories.meals.slice(0, MAX_CATEGORIES);
        arrCategories.unshift({ strCategory: 'All' });
        setCategories(arrCategories);
      });
  }, []);

  useEffect(() => {
    fetchRecipe('meal')
      .then((recipes) => setResults(recipes));
  }, [setResults]);

  const filterByCategory = (category) => {
    if (category === 'All') {
      fetchRecipe('meal')
        .then((recipes) => setResults(recipes));
    } else {
      fetchFilterByCategories('meal', category)
        .then((recipes) => setResults(recipes))
        .catch((error) => console.log(error));
    }
  };

  function onlyTwelveRecipes(meal, index) {
    if (index <= ELEVEN) {
      return (
        <Link key={ meal.idMeal } to={ `/foods/${meal.idMeal}` }>
          <RecipesCard
            recipe={ meal }
            index={ index }
            type="Meal"
          />
        </Link>
      );
    }
    return null;
  }

  return (
    <Container>
      <h1 data-testid="page-title">Foods</h1>
      <Header type="meal" />
      <Row>
        {categories.length > 0 && categories.map((category) => (
          <Col xs="4" as="section" key={ category.strCategory }>
            <ButtonCategory
              category={ category.strCategory }
              filterBy={ filterByCategory }
            />
          </Col>
        ))}
      </Row>
      {results.meals && results.meals
        .map((meal, index) => (
          onlyTwelveRecipes(meal, index)
        ))}
      <Footer />
    </Container>
  );
}

export default Foods;

import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRecipe, fetchRecipeCategories } from '../services';

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
    <Container>
      <h1 data-testid="page-title">Foods</h1>
      <Header type="meal" />
      <Row>
        {categories.length > 0 && categories.map((category) => (
          <Col xs="4" as="section" key={ category.strCategory }>
            <Button
              data-testid={ `${category.strCategory}-category-filter` }
              className="w-100"
              variant="outline-primary"
            >
              {category.strCategory }
            </Button>
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

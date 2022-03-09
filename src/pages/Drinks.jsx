import React, { useContext, useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import RecipesCard from '../components/RecipesCard';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRecipe, fetchRecipeCategories, fetchFilterByCategories } from '../services';

function Drinks() {
  const { results, setResults } = useContext(RecipesContext);
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
    fetchRecipe('cocktail')
      .then((recipes) => setResults(recipes));
  }, [setResults]);

  const filterByCategory = (category) => {
    fetchFilterByCategories('cocktail', category)
      .then((recipes) => setResults(recipes))
      .catch((error) => console.log(error));
  };

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
    <Container>
      <Header type="cocktail" />
      <h1 data-testid="page-title">Drinks</h1>
      <Row>
        {categories.length > 0 && categories.map((category) => (
          <Col xs="4" as="section" key={ category.strCategory }>
            <Button
              data-testid={ `${category.strCategory}-category-filter` }
              className="w-100 h-100 text-break text-wrap"
              variant="outline-primary"
              onClick={ () => filterByCategory(category.strCategory) }
            >
              {category.strCategory }
            </Button>
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

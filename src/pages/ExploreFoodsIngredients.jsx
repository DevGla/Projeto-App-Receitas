import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchIngredients } from '../services';
import IngredientImage from '../components/IngredientImage';

function ExploreFoodsIngredients() {
  const [ingredientsList, setIngredientsList] = useState([]);
  const ELEVEN = 11;

  useEffect(() => {
    fetchIngredients('meal')
      .then((ingredients) => {
        const arr = ingredients.meals.slice(0, ELEVEN + 1);
        setIngredientsList(arr);
      });
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" />
      <Row>
        {
          ingredientsList && ingredientsList.length > 0 && (
            ingredientsList.map((ingredient, index) => (
              <Col key={ ingredient.strIngredient }>
                <IngredientImage type="meal" index={ index } ingredient={ ingredient } />
              </Col>
            ))
          )
        }
      </Row>
      <Footer />
    </>
  );
}

export default ExploreFoodsIngredients;

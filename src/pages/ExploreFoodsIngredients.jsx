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
    <div className="mt-5 pt-5 pb-5">
      <Header title="Explore Ingredients" />
      <Row className="m-0">
        {
          ingredientsList && ingredientsList.length > 0 && (
            ingredientsList.map((ingredient, index) => (
              <Col xs="6" key={ ingredient.strIngredient }>
                <IngredientImage type="meal" index={ index } ingredient={ ingredient } />
              </Col>
            ))
          )
        }
      </Row>
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;

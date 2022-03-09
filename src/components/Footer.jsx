import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <Container className="fixed-bottom border" fluid data-testid="footer">
      <Row className="py-2">
        <Col className="d-flex justify-content-center">
          <Link to="/drinks">
            <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink's icon" />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <Link to="/explore">
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="explore's icon"
            />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <Link to="/foods">
            <img data-testid="food-bottom-btn" src={ mealIcon } alt="food's icon" />
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;

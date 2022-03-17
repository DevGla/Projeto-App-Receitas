import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Col, Row } from 'react-bootstrap';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import DoneCard from '../components/DoneCard';

function DoneRecipes() {
  const [state, setState] = useState([]);
  const [copied, setCopied] = useState(false);
  const [filterState, setFilterState] = useState([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setState(local);
    setFilterState(local);
  }, []);

  const handleShare = (id, type) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
  };

  const filterByType = (type) => {
    switch (type) {
    case 'food':
      setFilterState(state.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setFilterState(state.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'all':
      setFilterState(state);
      break;
    default:
      break;
    }
  };

  return (
    <div className="mx-4 pb-5">
      <Header title="Done Recipes" />
      <Row style={ { marginTop: '75px' } }>
        <Col>
          <button
            type="button"
            className="w-100 button__category overflow-hidden"
            data-testid="filter-by-all-btn"
            onClick={ () => filterByType('all') }
          >
            All
          </button>
        </Col>
        <Col>
          <button
            type="button"
            className="w-100 button__category overflow-hidden"
            data-testid="filter-by-food-btn"
            onClick={ () => filterByType('food') }
          >
            Food
          </button>
        </Col>
        <Col>
          <button
            type="button"
            className="w-100 button__category overflow-hidden"
            data-testid="filter-by-drink-btn"
            onClick={ () => filterByType('drink') }
          >
            Drinks
          </button>
        </Col>
      </Row>
      {filterState.map((recipe, index) => (
        <Row
          key={ index }
          className="done__card position-relative shadow bg-body rounded"
        >
          <DoneCard
            index={ index }
            recipe={ recipe }
            copied={ copied }
            handleShare={ handleShare }
            shareIcon={ shareIcon }
          />
        </Row>
      ))}
    </div>
  );
}

export default DoneRecipes;

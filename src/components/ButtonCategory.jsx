import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function ButtonCategory({ category, filterBy }) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (active) filterBy('All');
    else filterBy(category);
    // clicou
    setActive((prev) => !prev);
  };

  return (
    <Button
      data-testid={ `${category}-category-filter` }
      className="w-100"
      variant="outline-primary"
      onClick={ handleActive }
    >
      {category.strCategory}
    </Button>
  );
}

ButtonCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.string),
  filterByCategory: PropTypes.func,
}.isRequired;

export default ButtonCategory;

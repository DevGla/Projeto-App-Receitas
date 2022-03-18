import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ButtonCategory({ category, filterBy }) {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    if (active) filterBy('All');
    else filterBy(category);
    // clicou
    setActive((prev) => !prev);
  };

  return (
    <button
      type="button"
      data-testid={ `${category}-category-filter` }
      className="w-100 button__category overflow-hidden"
      onClick={ handleActive }
    >
      {category}
    </button>
  );
}

ButtonCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.string),
  filterByCategory: PropTypes.func,
}.isRequired;

export default ButtonCategory;

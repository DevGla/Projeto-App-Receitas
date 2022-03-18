import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function IngredientStep(props) {
  const { index, handleClick, e, measures } = props;
  const [check, setCheck] = useState(false);
  const ingredientLabel = useRef();
  const ingredientCheckbox = useRef();

  useEffect(() => {
    if (check) {
      ingredientLabel.current.classList.add('ingredient__checked');
    } else ingredientLabel.current.classList.remove('ingredient__checked');
  }, [check]);

  return (
    <>
      <input
        type="checkbox"
        ref={ ingredientCheckbox }
        id={ index }
        onClick={ (event) => {
          setCheck((prev) => !prev);
          handleClick(event);
        } }
      />
      {measures[index] ? (
        <label
          ref={ ingredientLabel }
          // className={ check ? 'ingredient__checked' : undefined }
          htmlFor={ index }
        >
          {`${e[1]} - ${measures[index][1]}`}
        </label>
      )
        : (
          <label
            htmlFor={ index }
            ref={ ingredientLabel }
            // className={ check ? 'ingredient__checked' : undefined }
          >
            {`${e[1]}`}
          </label>
        )}
    </>
  );
}

IngredientStep.propTypes = {
  index: PropTypes.number,
  handleClick: PropTypes.func,
  e: PropTypes.array,
  measures: PropTypes.array,
}.isRequired;

export default IngredientStep;

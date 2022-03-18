import React from 'react';
import PropTypes from 'prop-types';

function ExploreCard({ title, image }) {
  return (
    <div className="shadow bg-body rounded">
      <img
        src={ image }
        className="card-img-top explore-img"
        alt="..."
        height="170px"
      />
      <div className="card-body py-2 text-center text-dark">
        { title }
      </div>
    </div>
  );
}

ExploreCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
}.isRequired;

export default ExploreCard;

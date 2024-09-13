import React from 'react';

const RatingStar = ({ rating }) => {
  const stars = [];

  // Corrected the loop condition and syntax
  for (let i = 0; i < 5; i++) {
    stars.push(
      // Fixed className syntax by using backticks and the correct condition
      <span key={i} className={`ri-star${i < rating ? '-fill' : '-line'}`}></span>
    );
  }

  return (
    <div className="product__rating">
      {stars} {/* Corrected to render stars */}
    </div>
  );
};

export default RatingStar;

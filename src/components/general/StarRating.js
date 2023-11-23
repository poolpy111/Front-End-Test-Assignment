import React from 'react';

const StarRating = ({ selectedRating, onRatingChange }) => {
  const handleRatingClick = (rating) => {
    onRatingChange(rating);
  };

  return (
    <div style={{ fontSize: '24px', marginBottom: '20px' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <span
            key={ratingValue}
            onClick={() => handleRatingClick(ratingValue)}
            style={{ color: ratingValue <= selectedRating ? 'gold' : 'gray', cursor: 'pointer' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;

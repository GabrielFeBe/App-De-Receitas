import React from 'react';

export default function Recipes() {
  return (
    <div>
      <h2 data-testid={ `${index}-card-name` }>{ index }</h2>
      <div
        data-testid={ `${index}-recipe-card` }
      />
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ alt }
      />
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const CardComponent = ({hero}) => {
  return (
    <div>
      <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} />
      <h1>{hero.name}</h1>
    </div>
  );
}

CardComponent.propTypes = {
  hero: PropTypes.object,
}

export default CardComponent;
import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

const Card = ({hero}) => {
  return (
    <div className="card-hero">
      <img src={hero.thumbnail.path + '.' + hero.thumbnail.extension} alt={hero.name} />
      <h1>{hero.name}</h1>
    </div>
  );
}

Card.propTypes = {
  hero: PropTypes.object,
}

export default Card;
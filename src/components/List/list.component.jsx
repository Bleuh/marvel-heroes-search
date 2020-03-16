import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.component';

const List = ({heroes}) => {
  return (
    <div>
      {
        heroes.map((hero, index) => (
          <li key={index}><Card hero={hero}/></li>
        ))
      }
    </div>
  );
}

List.propTypes = {
  heroes: PropTypes.array,
}

export default List;
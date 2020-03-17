import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/card.component';
import './list.css';

const List = ({heroes}) => {
  return (
    <div className="list-heroes">
      {
        heroes.map((hero, index) => (
          <Card hero={hero} key={index}/>
        ))
      }
    </div>
  );
}

List.propTypes = {
  heroes: PropTypes.array,
}

export default List;
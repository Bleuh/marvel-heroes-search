import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.query || '',
      findHeroes: props.findHeroes,
      timeout: null,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    clearTimeout(this.state.timeout);
    let query = this.state.query;
    query = e.target.value;
    this.setState({
      query: query,
      timeout: setTimeout(() => {
        this.state.findHeroes();
      }, 500),
    });
  }

  render() {
    return (
      <div>
        <input id="hero-query" type="text" placeholder="nom d'un super hero" name="hero-query" onChange={this.handleChange} value={this.state.query}/>
      </div>
    );
  }
}

Input.propTypes = {
  query: PropTypes.string,
  findHeroes: PropTypes.func,
  isTimeout: PropTypes.func
}

export default Input;

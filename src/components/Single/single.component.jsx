import React from 'react';
import https from 'https';
import PropTypes from 'prop-types';
import md5 from 'md5';
import './single.css';

const url = 'https://gateway.marvel.com/v1/public/characters';

class SingleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hero: null,
      id: props.id
    }
  }
  componentDidMount() {
    const ts = new Date().getMilliseconds();
    const hash = md5(`${ts}${process.env.REACT_APP_PRIVATE_API_KEY}${process.env.REACT_APP_PUBLIC_API_KEY}`);
    const generatedUrl = `${url}/${this.state.id}?apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}&ts=${ts}`;
    https.get(generatedUrl, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        body = JSON.parse(body);
        if (body.data && body.data.count > 0) {
          this.setState({
            hero: body.data.results[0],
          });
        }
      });
    });
  }
  render() {
    return (
      <div className="single-hero">
        {
          this.state.hero === null ? <h1>no hero found</h1> :
          <div>
            <h1>{this.state.hero.name}</h1>
            <div>
              <img src={this.state.hero.thumbnail.path + '.' + this.state.hero.thumbnail.extension} alt={this.state.hero.name} />
              <p>{this.state.hero.description}</p>
            </div>
          </div>
        }
      </div>
    );
  }
}

SingleComponent.propTypes = {
  id: PropTypes.string,
}

export default SingleComponent;

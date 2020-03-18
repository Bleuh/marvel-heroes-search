import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import InputComponent from './components/Input/input.component';
import CardComponent from './components/Card/card.component';
import SingleComponent from './components/Single/single.component';
import https from 'https';
import md5 from 'md5';

const url = 'https://gateway.marvel.com/v1/public/characters';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: [],
    }
    this.findHeroes = this.findHeroes.bind(this);
  }
  findHeroes(query) {
    const ts = new Date().getMilliseconds();
    const hash = md5(`${ts}${process.env.REACT_APP_PRIVATE_API_KEY}${process.env.REACT_APP_PUBLIC_API_KEY}`);
    const generatedUrl = `${url}?nameStartsWith=${query}&apikey=${process.env.REACT_APP_PUBLIC_API_KEY}&hash=${hash}&ts=${ts}`;
    https.get(generatedUrl, res => {
      res.setEncoding('utf8');
      let body = '';
      res.on('data', data => {
        body += data;
      });
      res.on('end', () => {
        body = JSON.parse(body);
        this.setState({
          heroes: body.data.results,
        });
      });
    });
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" render={() => (
              <div>
                <InputComponent findHeroes={this.findHeroes}/>
                <div className="list-heroes">
                  {
                    this.state.heroes.map((hero, index) => (
                      <Link to={`/hero/${hero.id}`} key={index} className="card-hero">
                        <CardComponent hero={hero}/>
                      </Link>
                    ))
                  }
                </div>
              </div>
            )}/>
            <Route exact path="/hero/:id" component={Single}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Single() {
  const { id } = useParams();
  return <SingleComponent id={id}/>
}

export default App;

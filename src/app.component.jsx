import React from 'react';
import './App.css';
import Input from './components/Input/input.component';
import List from './components/List/list.component';

const https = require("https");
var md5 = require('md5');
const url = "https://gateway.marvel.com/v1/public/characters";

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
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        console.log('callapi');
        body = JSON.parse(body);
        console.log(body);
        this.setState({
          heroes: body.data.results,
        });
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Input findHeroes={this.findHeroes}/>
        <List heroes={this.state.heroes}/>
      </div>
    );
  }
}

export default App;

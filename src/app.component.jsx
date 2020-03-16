import React from 'react';
import './App.css';
import Input from './components/Input/input.component';
import List from './components/List/list.component';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      heroes: [],
    }
    this.findHeroes = this.findHeroes.bind(this);
  }
  findHeroes() {
    console.log('callapi');
    this.setState({
      heroes: [1,2,3],
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

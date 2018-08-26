import React, { Component } from 'react';
import './App.css';
import GameTable from './containers/GameTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameTable />
      </div>
    );
  }
}

export default App;

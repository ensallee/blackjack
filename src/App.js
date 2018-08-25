import React, { Component, Fragment } from 'react';
import './App.css';
import GameTable from './containers/GameTable'

class App extends Component {
  render() {
    return (
      <Fragment>
        <GameTable />
      </Fragment>
    );
  }
}

export default App;

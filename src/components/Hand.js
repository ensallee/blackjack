import React, { Component, Fragment } from 'react';
import Card from './Card'

class Hand extends Component {

  changeSum = (value, flippedStatus) => {
    if (flippedStatus) {
      this.props.changeSum(this.props.player, value)
    }
  }

  render() {
  let cardComponents = this.props.cards.map(c => {
    return <Card changeSum={this.changeSum} value={c.value} image={c.image} suit={c.suit}/>
  })
  return (
    <Fragment>
      <div className="center">
        <button className="button" onClick={() => this.props.dealAnotherCard(this.props.player)}>Hit me!</button>
        {this.props.player === "player" ? <button className="button" onClick={this.props.determineWinner}>Stay</button> : null}
        <h5>Score: {this.props.sum}</h5>
        <div>{cardComponents}</div>
      </div>
    </Fragment>
    )
  }
}

export default Hand;

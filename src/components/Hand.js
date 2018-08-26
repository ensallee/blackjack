import React, { Component, Fragment } from 'react';
import Card from './Card'

class Hand extends Component {
  // constructor(props) {
  //   super(props)
  //
  //   this.state={
  //     sum: 0,
  //     hasThree: false
  //   }
  // }

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
      <div>{cardComponents}</div>
      <h6>Sum: {this.props.sum}</h6>
      <button onClick={() => this.props.dealAnotherCard(this.props.player)}>Hit me!</button>
      <button onClick={this.props.determineWinner}>Stay</button>
    </Fragment>
    )
  }
}

export default Hand

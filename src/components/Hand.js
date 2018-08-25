import React, { Component, Fragment } from 'react';
import Card from './Card'

class Hand extends Component {
  constructor(props) {
    super(props)

    this.state={
      sum: 0,
      hasThree: false
    }
  }

  changeSum = (value, flippedStatus) => {
    console.log('value inside changeSum', value)
    if (flippedStatus) {
      this.setState({
        sum: this.state.sum += value
      })
    } else {
      this.setState({
        sum: this.state.sum -= value
      })
    }
  }

  render() {
  let cardComponents = this.props.cards.map(c => {
    return <Card changeSum={this.changeSum} value={c.value} image={c.image} suit={c.suit}/>
  })
  return (
    <Fragment>
      <div>{cardComponents}</div>
      <h6>Sum: {this.state.sum}</h6>
      {this.props.cards.length !== 3 ? <button onClick={() => this.props.dealAnotherCard(this.props.player)}>Hit me!</button> : null}
    </Fragment>
    )
  }
}

export default Hand

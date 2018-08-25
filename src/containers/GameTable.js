import React, { Component, Fragment } from 'react';
import Hand from '../components/Hand'

class GameTable extends Component {
  constructor(props) {
    super(props)

    this.state={
      deckId: null,
      inProgress: false,
      dealerCards: [],
      playerCards: []
    }
  }

  componentDidMount() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(resp => resp.json())
    .then(data => this.setState({
      deckId: data.deck_id
    }))
  }

  drawCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=4`)
    .then(resp => resp.json())
    .then(data => {
        this.setState({
        playerCards: [data.cards[0], data.cards[2]],
        dealerCards: [data.cards[1], data.cards[3]],
        inProgress: true
      })
    })
  }

  dealAnotherCard = (player) => {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
    .then(resp => resp.json())
    .then(data => {
      if (player === "player") {
        this.setState({
          playerCards: [...this.state.playerCards, data.cards[0]]
        }, () => console.log('playercards after adding', this.state.playerCards))
      } else if (player === "dealer") {
        this.setState({
          dealerCards: [...this.state.dealerCards, data.cards[0]]
        }, () => console.log('dealercards after adding', this.state.dealerCards))
      }
    })
  }

  render() {
    return (
      <Fragment>
        {this.state.inProgress ? null : <button onClick={this.drawCards}>Start Game</button>}
        <h1>Dealers Cards!</h1>
        <Hand player="dealer" dealAnotherCard={this.dealAnotherCard} cards={this.state.dealerCards} />
        <h1>Players Cards!</h1>
        <Hand player="player" dealAnotherCard={this.dealAnotherCard} cards={this.state.playerCards} />
      </Fragment>
    )
  }
}

export default GameTable;

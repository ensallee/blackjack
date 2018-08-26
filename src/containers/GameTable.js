import React, { Component, Fragment } from 'react';
import Hand from '../components/Hand'

class GameTable extends Component {
  constructor(props) {
    super(props)

    this.state={
      deckId: null,
      inProgress: false,
      dealerCards: [],
      playerCards: [],
      dealerSum: 0,
      playerSum: 0,
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
        })
      } else if (player === "dealer") {
        this.setState({
          dealerCards: [...this.state.dealerCards, data.cards[0]]
        })
      }
    })
  }

  determineWinner = () => {
    let totalDealerSum = 0
    this.state.dealerCards.forEach(card => {
      console.log('card.value inside determineWinner', card.value)
      if (card.value === "ACE") {
        totalDealerSum += 1;
      } else if (parseInt(card.value)) {
        totalDealerSum += parseInt(card.value)
      } else {
        totalDealerSum += 10;
      }
    })
    if (this.state.playerSum === 21 && this.state.playerSum !== totalDealerSum) {
      alert("Blackjack! You win!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum > totalDealerSum && this.state.playerSum <= 21) {
      alert("You win!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum < totalDealerSum && totalDealerSum <= 21) {
      alert("Dealer wins! Better luck next time.")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum >= 21) {
      alert("Bust!!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum === this.state.dealerSum && this.state.playerSum <= 21) {
      alert("It's a tie!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    }
  }

  changeSum = (player, value) => {
    if (player === "player") {
      this.setState({
        playerSum: this.state.playerSum += value
      })
    } else {
      this.setState({
        dealerSum: this.state.dealerSum += value
      })
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.inProgress ? <Fragment><h1>Dealers Cards!</h1>
                <Hand player="dealer" determineWinner={this.determineWinner} changeSum={this.changeSum} sum={this.state.dealerSum} dealAnotherCard={this.dealAnotherCard} cards={this.state.dealerCards} />
                <h1>Players Cards!</h1>
                <Hand player="player" determineWinner={this.determineWinner} changeSum={this.changeSum} sum={this.state.playerSum} dealAnotherCard={this.dealAnotherCard} cards={this.state.playerCards} /></Fragment> : <button onClick={this.drawCards}>Start Game</button>}
      </Fragment>
    )
  }
}

export default GameTable;

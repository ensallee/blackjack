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
    let totalDealerSumIncludingHiddenValues = 0
    this.state.dealerCards.forEach(card => {
      if (card.value === "ACE") {
        totalDealerSumIncludingHiddenValues += 1;
      } else if (parseInt(card.value)) {
        totalDealerSumIncludingHiddenValues += parseInt(card.value)
      } else {
        totalDealerSumIncludingHiddenValues += 10;
      }
    })
    if (this.state.playerSum === 21 && this.state.playerSum !== totalDealerSumIncludingHiddenValues) {
      alert("Blackjack! You win!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum > totalDealerSumIncludingHiddenValues && this.state.playerSum <= 21) {
      alert("You win!")
      this.setState({
        inProgress: false,
        dealerCards: [],
        playerCards:[],
        dealerSum: 0,
        playerSum: 0
      })
    } else if (this.state.playerSum < totalDealerSumIncludingHiddenValues && totalDealerSumIncludingHiddenValues <= 21) {
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
      }, () => {
        if (this.state.playerSum > 21) {
          alert("Bust!!!")
          this.setState({
            inProgress: false,
            dealerCards: [],
            playerCards:[],
            dealerSum: 0,
            playerSum: 0
          })
        }
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
        <div className="game-table">
          <h1 id="title">Blackjack</h1>
          {this.state.inProgress ? <Fragment><h3 className="center">Dealer</h3>
            <Hand player="dealer" determineWinner={this.determineWinner} changeSum={this.changeSum} sum={this.state.dealerSum} dealAnotherCard={this.dealAnotherCard} cards={this.state.dealerCards} />
            <hr></hr>
            <h3 className="center">Player</h3>
            <Hand player="player" determineWinner={this.determineWinner} changeSum={this.changeSum} sum={this.state.playerSum} dealAnotherCard={this.dealAnotherCard} cards={this.state.playerCards} /></Fragment> : <Fragment><div className="rules">
              <h3>Rules:</h3>
              <p>The object of the game is to get a score that's as close to 21 as possible. If you go over 21, you automatically lose.
              <br></br>
              <br></br>
              Numbered cards are worth the corresponding number on the cards. Face cards are worth 10, and Aces are worth 1.
              <br></br>
              <br></br>
              At the beginning of the game, both you and the dealer will be dealt two cards. Click on a card to turn it over and add its value to your score. If you'd like another card, click "Hit me!". But be careful! If your new score goes over 21, you will automatically go bust. If you have 21 points, or if you think asking for a new card is too risky, click "Stay," which will automatically end the game. If, at this point, you have a higher score than the dealer, you win the game.
              <br></br>
              <br></br>
              Note: In this version of the game, you will be able to see the dealer's cards.
              <br></br>
              <br></br>
              Good luck!
             </p>
            </div>
            <div className="center"><button className="button" onClick={this.drawCards}>Start Game</button></div></Fragment>
          }
        </div>
      </Fragment>
    )
  }
}

export default GameTable;

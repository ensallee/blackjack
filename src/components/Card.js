import React, { Component, Fragment } from 'react';

class Card extends Component {
  constructor(props) {
    super(props)

    this.state={
      flipped: false
    }
  }

  flipCard = () => {
    let value;
    if (this.props.value === "ACE") {
      value = 1;
    }
    else if (parseInt(this.props.value)) {
      value = parseInt(this.props.value)
    } else {
      value = 10;
    }
    this.setState({
      flipped: true
    }, () => this.props.changeSum(this.props.player, value))
  }

  render() {
    let displayValue;
    switch(this.props.value) {
      case "QUEEN":
        displayValue= "Q";
        break;
      case "KING":
        displayValue= "K";
        break;
      case "JACK":
        displayValue= "J";
        break;
      case "ACE":
        displayValue= "A";
        break;
      default:
        displayValue = this.props.value;
    }
    return (
      <Fragment>
        {this.state.flipped ? <div className="flipped-card">
          <h3 className={this.props.suit === "HEARTS" || this.props.suit === "DIAMONDS" ? "red value-of-card" : "value-of-card"}>{displayValue}</h3>
          <div className="suit-container">
            {this.props.suit === "HEARTS" ? <img src={require('../images/heart.png')}></img> : null}
            {this.props.suit === "CLUBS" ? <img src={require('../images/club.jpg')}></img> : null}
            {this.props.suit === "DIAMONDS" ? <img src={require('../images/diamond.png')}></img> : null}
            {this.props.suit === "SPADES" ? <img src={require('../images/spade.jpg')}></img> : null}
          </div>
          <div className="bottom-suit-container">
            {this.props.suit === "HEARTS" ? <img src={require('../images/heart.png')}></img> : null}
            {this.props.suit === "CLUBS" ? <img src={require('../images/club.jpg')}></img> : null}
            {this.props.suit === "DIAMONDS" ? <img src={require('../images/diamond.png')}></img> : null}
            {this.props.suit === "SPADES" ? <img src={require('../images/spade.jpg')}></img> : null}
          </div>
          <h3 className={this.props.suit === "HEARTS" || this.props.suit === "DIAMONDS" ? "red bottom-value-of-card" : "bottom-value-of-card"}>{displayValue}</h3>
        </div> : <div onClick={this.flipCard} className="hidden-card" />}
      </Fragment>
    )
  }
}

export default Card;

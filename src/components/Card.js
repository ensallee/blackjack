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
    if (!this.state.flipped) {
      this.setState({
        flipped: true
      }, () => this.props.changeSum(value, this.state.flipped))
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.flipped ? <img src={this.props.image} /> : <img onClick={this.flipCard} src="http://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-tangent-back-1_grande.png?v=1474345861" /> }
      </Fragment>
    )
  }
}

export default Card;

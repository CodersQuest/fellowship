import React, { Component } from 'react';
import TokenTemplateListItem from './TokenTemplateListItem.jsx';


class TokenTemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null
    }
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragStart(e) {
    e.target.style.opacity = '0.4'; 
    e.target.classList.add('target-image');
  }

  handleDragEnd(e) {
    e.target.style.opacity = '1';
    e.target.classList.remove('target-image');

  }

  componentDidMount() {
    var t = document.querySelectorAll(".token-item")
    t.forEach(token => {
      token.addEventListener('dragstart', this.handleDragStart, false);
      token.addEventListener('dragend', this.handleDragEnd, false)
    })
  }

  render() {
    return (
      <div id="tokenlist" className="column">
      <button onClick={this.props.onClear} className="button is-dark">Clear Tokens</button>
        {this.props.tokenImages.map(url =>

          <TokenTemplateListItem
            key={url}
            imgUrl={url} />


        )}
      </div>
    )
  }

}

export default TokenTemplateList;
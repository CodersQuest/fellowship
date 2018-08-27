import React, {Component} from 'react';
import TokenTemplateListItem from './TokenTemplateListItem.jsx';


class TokenTemplateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: null,
    };
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
    let t = document.querySelectorAll('.token-item');
    t.forEach((token) => {
      token.addEventListener('dragstart', this.handleDragStart, false);
      token.addEventListener('dragend', this.handleDragEnd, false);
    });
  }

  render() {
    return (
      <div id="tokenlist" className="column">
      <button onClick={this.props.onClear} className="button is-dark">Clear Tokens</button>
        <div className="dropdown is-hoverable is-dark is-left">
        <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
      <span>Tokens</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
        </div>
        <div className="dropdown-menu">
        {/* <ul className="dropdown-content"> //comment in if you want the token menu to have white background */}
        {this.props.tokenImages.map((url) =>
          <li className="dropdown-item column is-narrow">
          <TokenTemplateListItem
            key={url}
            imgUrl={url} />


        </li>
        )}
        {/* </ul> */}
        </div>
        </div>
      </div>
    );
  }
}

export default TokenTemplateList;

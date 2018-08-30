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
  console.log(this.props)
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
        <button onClick={this.props.onClear} className="button qip-btn">Clear Tokens</button>
        <div className="dropdown is-hoverable is-dark is-left">
          <div className="dropdown-trigger">
            <button className="button qip-btn" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Players</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu custom-select">
            <ul className="dropdown-content has-background-grey token-grid">
              {this.props.tokenImages[0].map((url) =>
                <li className="dropdown-item has-background-grey">
                  <TokenTemplateListItem
                    key={url}
                    imgUrl={url} />
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="dropdown is-hoverable is-dark is-left">
          <div className="dropdown-trigger">
            <button className="button qip-btn" aria-haspopup="true" aria-controls="dropdown-menu4">
              <span>Enemies</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu custom-select">
          <div className="dropdown-content has-background-grey token-grid"> 
          {this.props.tokenImages[1].map((url) =>
            <div className="dropdown-item has-background-grey is-large">
            <TokenTemplateListItem
              key={url}
              imgUrl={url} />
          </div>
          )}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TokenTemplateList;
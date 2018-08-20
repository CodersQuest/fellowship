import React, {Component} from 'react';
import TokenTemplateListItem from './TokenTemplateListItem.jsx';


class TokenTemplateList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      state: null
      }
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragStart(e) {
    e.target.style.opacity = '0.4';  // this / e.target is the source node.
  }

  handleDragEnd(e) {
    // this/e.target is the source node.
    // var t = document.querySelectorAll(".token-item")
    // t.forEach(token => {
    // token.classList.remove('over');
    // });
    e.target.style.opacity = '1';
  }

  componentDidMount () {
    var t = document.querySelectorAll(".token-item")
    t.forEach(token => {
      token.addEventListener('dragstart', this.handleDragStart, false);
      token.addEventListener('dragend', this.handleDragEnd, false)
    })
  }

  render () {
      return (
          <div id="tokenlist">
          {this.props.tokenImages.map(url =>
          
          <TokenTemplateListItem 
          // handleDragOver={this.handleDragOver}
          // handleDragStart={this.handleDragStart}
          imgUrl={url}/>
        
        
        )}
          </div>
      )
  }

}

export default TokenTemplateList;
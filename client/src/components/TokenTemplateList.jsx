import React, {Component} from 'react';
import TokenTemplateListItem from './TokenTemplateListItem.jsx';


class TokenTemplateList extends Component {
  constructor(props) {
      super(props);
      this.state ={
        state: null
      }
  }

  render () {
      return (
          <div id="tokenlist">
          {this.props.tokenImages.map(url =>
          
          <TokenTemplateListItem imgUrl={url}/>
        
        
        )}
          </div>
      )
  }

}

export default TokenTemplateList;
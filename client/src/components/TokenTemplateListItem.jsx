import React, {Component} from 'react';

class TokenTemplateListItem extends Component {
  render() {
      return (
        <div id="tokenimage">
        <img draggable="true" src={this.props.imgUrl} width="100" height="100"></img>
    </div>
      )
  }

}

export default TokenTemplateListItem;
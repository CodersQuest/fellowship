import React, {Component} from 'react';

const TokenTemplateListItem = ({imgUrl}) => (
  <div id="tokenimage">
    <img className="token-item" draggable="true" src={imgUrl} width="100" height="100"></img>
  </div>
)
 
export default TokenTemplateListItem;
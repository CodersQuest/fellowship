import React from 'react';

const TokenTemplateListItem = ({imgUrl,}) => (
  <div id="tokenimage">
    <img className="token-item" draggable="true" src={imgUrl} width="30%" height="30%"></img>
  </div>
);

export default TokenTemplateListItem;

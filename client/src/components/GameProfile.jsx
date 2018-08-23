import React from 'react';

const GameProfile = (props) => {
  {return !props.player ? null : 
    <div id="gameProfile">
      <img src={props.player.image} />
      <div>
        {props.player.player}
      </div>
    </div>
  }
}

export default GameProfile;
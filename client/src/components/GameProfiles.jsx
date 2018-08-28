import React from 'react';
import GameProfile from './GameProfile.jsx';

// Component that will contain Each User Profile in the game based on current players
// This will expect an array of players(as objects) in order to render. 

class GameProfiles extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props in GameProfile is ', this.props)
  }

  render() {
    return (
      <div id="userProfiles">
        {this.props.players.map((user) => (
          <GameProfile player={user}/> )
        )}
      </div>
    );
  }
}

export default GameProfiles;

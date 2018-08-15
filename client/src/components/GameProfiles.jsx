import React from 'react';

// Component that will contain Each User Profile in the game based on current players
// This will expect an array of players(as objects) in order to render. 

class GameProfiles extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="userProfiles">
        <h1>USER PROFILES</h1>
      </div>
    )
  }
}

export default GameProfiles;
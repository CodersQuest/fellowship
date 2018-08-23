import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
import { joinGame, diceRoll, addToken, removeToken, moveToken, playerConnect, socket } from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia, defaultGameAvatar} from '../images/imageData.js';
 
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
      tokenImages: [eevee, ninetails, clefairy, lugia]
    }
    this.rollDice = this.rollDice.bind(this);
    // this.updateClientLog = this.updateClientLog.bind(this);
  }
  

  componentDidMount() {
    // need to find out why this is running twice
    console.log(this.props.currentUser);
    playerConnect(this.props.currentUser);
    socket.on('newPlayer', (data) => {
      console.log(data);
      joinGame(this.props.currentGame);
    });
    socket.on('gameStatusUpdated', (data) => {
      console.log(data.logs);
    })
  }

  rollDice(value) {
    const roll = Math.floor(Math.random() * (max - 1 + 1) + 1);
    const user = this.props.currentUser.username;
    //! Add roll context to this later. As well as Bonus modifier.
    diceRoll({
      player: user,
      roll: roll
    });
    
    console.log(value);
  }
  
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    
    console.log(isLoggedIn)
    if (this.props.currentUser === null)  {
      return (
        <Redirect 
          to={{
            pathname: "/login",
            state: {
              from: this.props.location.pathname
            }
          }}
        />
      )
    }
    

    if ( isLoggedIn && (this.props.currentGame).hasOwnProperty('gameId') ) {
      
      return (
        <Fragment>
          <div id="gameContainer">
            <TokenTemplateList tokenImages={this.state.tokenImages}/>
            <BattleMap />   
  
            <BattleLog 
              // handleDisplayLog={this.handleDisplayLog}
              currentLog={this.state.log}
              {...this.props}
            />
            <GameProfiles />
            <GameOptions />
            <DiceTray rollDice={this.rollDice}/>
          </div>
        </Fragment>
      )
    } else {
      return (
        <Redirect 
          to={{
            pathname: "/",
            state: {
              from: this.props.location.pathname
            }
          }}
        />
      )
    }
    
  } // end render()
}

export default GameRoom;
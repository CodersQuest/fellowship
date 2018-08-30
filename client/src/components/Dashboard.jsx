import React, {Component} from 'react';
import axios from 'axios';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css';
import {Redirect} from 'react-router-dom';
import data from './dashBoardDummyData.js';
import CreateGameModal from './CreateGameModal.jsx';
import CreateGameForm from './CreateGameForm';
import QuestLogo from './QuestLogo.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 0,
      userGamesData: data,
      modalState: false,
    };
    // console.log(this.props);
    this.createNewGame = this.createNewGame.bind(this);
    this.deleteUserGame = this.deleteUserGame.bind(this);
    this.validateGameName = this.validateGameName.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  getUserGames() {
    if (this.props.currentUser) {
      let gamesData = null;
      let gameCollection = this.props.currentUser.gamesPartOf;
      // console.log('how game collection looks before AXIOS::: ', gameCollection);
      axios.get('/api/getusergames', {
        params: {
          gameids: gameCollection,
        },
      })
      .then((response) => {
        console.log(response);
        let gameObjectArray = response.data;
        this.setState({
          userGamesData: gameObjectArray,
        });
      })
      .catch((error) => console.log('Error from getUserGames:::: ', error));
    }
  }

  validateGameName(gameName) {
    // check DB to find out if gameName exist

    // return boolean
  }

  deleteUserGame(gameName) {
    // remove game from Dashboard View

    // post updates to server for user to update 'gamesOwned'
     // 'currentGames', 'gamesPartOf' on user object
    // post updates to server for Game Object if this user is
      // game Owner
  }

  /**
  * createNewGame takes in gameObject and creates new
  * 'GameListItem' entry
  * @param {Object} gameObj createdGame object from
  * 'CreateGameForm'
  */
  createNewGame(gameObj) {
    console.log('got here!!!!!!', this.props);
    this.toggleModal();
    if (this.props.currentUser.gamesPartOf.length <= 4) {
      // add ownerId and ownerName to gameObj
      gameObj.ownerId = this.props.currentUser._id;
      gameObj.gameOwner = this.props.currentUser.username;
      // construct gameUrl and add to gameObj
      let sanitizedString = gameObj.gameName
        .replace(/[^A-Z0-9]+/ig, '')
        .toLowerCase();
      gameObj.gameUrl = sanitizedString;
      gameObj.players = [this.props.currentUser.username];
      gameObj.gameTokens = [];
      gameObj.gameLog = [];

      // console.log(gameObj);

      // Axios Post Request
      axios.post('/api/creategame', gameObj)
      .then((newGame) => {
        console.log(newGame);
        let updatedUserGamesData = this.state.userGamesData;
        updatedUserGamesData.push(newGame.data);
        this.props.updateGamesPartOf(newGame.data._id);
      })
      .catch((error) => console.log('Error from createNewGame:::: ', error));
    } else {
      // notifiy user that they have reached max allowed games
      alert('You have reached your limit of games');
    }
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;
      return {
        modalState: newState,
      };
    });
  }
  componentDidMount() {
    this.getUserGames();
  }

  render() {
    if (!this.props.isLoggedIn) return <Redirect to="/login" />;

    return (
      <div className="dashBoard">

        <div className="wrapper">
        
        <div className="navdash">
          <div className="paddedLogo">
            <QuestLogo />
          </div>
        </div>

        <div id="settings">
          <button id="profileButton">
            Profile
          </button>
          <button
            id="logoutButton"
            onClick={this.props.logOut}
            >Logout
          </button>
        </div>

        <div id="c"></div>

          <div id="gamelist">
            {this.state.userGamesData.length > 0 ? <GamesList games={this.state.userGamesData}
            joinGame={this.props.joinGame}
            history={this.props.history}
          /> : null}

          </div>

          <div id="sidebar">
            <button id="sideBarButton">
              Create New Game
            </button>

            <button id="sideBarButton">
              Add Existing Game
            </button>

            <button id="sideBarButton">
              Add Character Sheet
            </button>
            <div>
              <CreateGameModal
                closeModal={this.toggleModal}
                modalState={this.state.modalState}
                title="Create a new game"
              >
              <CreateGameForm
                createNewGame={this.createNewGame}

              />
              </CreateGameModal>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default Dashboard;

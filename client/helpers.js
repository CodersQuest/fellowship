// File for clientside help/game logic

//! This File Will Need To Be Refactored, depending upon socket Implementation.
// Dice Roll Logic

// Dice Roll must be able to handle the following dice rolls, D4, D6, D8, D10, D12, D20
// Dice Roll must be able to be rolled more then once, but default to one roll.
// Dice Roll must be able to add a bonus at some point in time.
// Dice Roll must return a string indicating the roll, the bonus, and the total
/**
 * 
 * @param {number} max represents max # on the dice selected
 * @param {number} bonus represents the bonus modifier for a roll
 */
const diceRoll = (max, bonus) => {
  const roll = Math.floor(Math.random() * (max - 1 + 1) + 1);
  let rollStr = '';
  if (bonus) {
      rollStr = `rolled a ${roll} out of ${max} with a modifier of ${bonus} for a total of ${roll + bonus}`;
  } else {
      rollStr = `rolled a ${roll} out of ${max} for a total of ${roll}`;
  }
  return rollStr;
};

// When a dice is rolled, a function must capture Username, as well as the context of the dice roll.
// This allows for a more useful dice roll battle log.
/**
 * 
 * @param {object} user user object should contain a username
 * @param {string} rollType 
 * @param {number} diceVal 
 * @param {number} bonus 
 */
// Helper funct for getting the user, the dice roll, and the roll type
// This is the function that will build out the string message to update
// the battle log and trigger, or be included in a socket event to update all users  
const createMessage = (user, rollType, diceVal, bonus) => {
  // capture username from user object
  // capture rollType string
  // pass diceVal and bonus(if it exists) into our diceRoll
  let currRoll = diceRoll(diceVal, bonus ? bonus : null);
  // concatenate and return the message string for socket.
  return `${user.username}: ${currRoll} for ${rollType}`; 
};

// Game Board Logic


/***************
 * DASHBOARD METHODS
 **************/
const initUserSocket = () => {
  const socket = openSocket('http://localhost:3000');
}

const deleteUserGame = (gameName) => {
  //remove game from Dashboard View

  //post updates to server for user to update 'gamesOwned'
   // 'currentGames', 'gamesPartOf' on user object
  // post updates to server for Game Object if this user is 
    // game Owner
}

// createNewGame allows a user to create a brand new game room 
// Gets called and receives 'game name' value from input
// Must check against maxAllowedGames = 5
// If 'game name' is unique then creates a new game room using 
// unique 'game name' as its identifier
/**
* 
* @param {Object} player represents logged in player passed to
* 'Dashboard' as Prop
*/
const createNewGame = (player) => {
  // user can only be a part of a max of 5 games
  // chck the users games array
  // route to the boardview

  // check gamesPartOf array length < 5
  if(user.gamesPartof.length <= 5) {
    // if yes redirect to new game
    
  } else {
    // notifiy user that they have reached max allowed games
  }
}


module.exports.diceRoll = diceRoll;
module.exports.initUserSocket = initUserSocket;
module.exports.deleteUserGame = deleteUserGame;
module.exports.createNewGame = createNewGame;
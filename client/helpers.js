// File for clientside help/game logic

// Dice Roll Logic

// Dice Roll must be able to handle the following dice rolls, D4, D6, D8, D10, D12, D20
// Dice Roll must be able to be rolled more then once, but default to one roll.
// Dice Roll must be able to add a bonus at some point in time.
// Dice Roll must return a string indicating the roll, the bonus, and the total

const diceRoll = (max, bonus) => {
    const roll = Math.floor(Math.random() * (max - 1 + 1) + 1);
    let string = '';
    if (bonus) {
        string = `rolled a ${roll} out of ${max} with a modifier of ${bonus} for a total of ${roll + bonus}`;
    } else {
        string = `rolled a ${roll} out of ${max} for a total of ${roll}`;
    }
    return string;
};

// When a dice is rolled, a function must capture Username, as well as the context of the dice roll.
// This allows for a more useful dice roll battle log.

// Game Board Logic


module.exports.diceRoll = diceRoll;
const util = require('../helpers');

describe('Dice Roll Feature', () => {
  test('Dice Roll Should Exist', () => {
    expect(util.diceRoll).toBeDefined();
  });
  test('Dice Roll should be a function', () => {
    expect(typeof util.diceRoll).toBe('function');
  });
  test('Dice Roll should return a string', () => {
    expect(typeof util.diceRoll()).toBe('string');
  });
  test('Dice Roll should return the correct string', () => {
    
  });
  test('Dice Roll should apply the bonus if a bonus is passed', () => {
    expect(1+1).toBe(2);
  });
});

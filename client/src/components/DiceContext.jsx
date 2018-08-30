import React from 'react';

const DiceContext = ({context, handleChange}) => (
  <React.Fragment>
    <select className='diceInput' 
      value={context}
      name='context'
      onChange={handleChange}>
      <option value='none'>None</option>
      <option value='Melee Attack'>Melee Attack</option>
      <option value='Ranged Attack'>Ranged Attack</option>
      <option value='Spell Attack'>Spell Attack</option>
      <option value='Damage'>Damage</option>
      <option value='Skill Check'>Skill Check</option>
      <option value='Ability Check'>Ability Check</option>
      <option value='Initiative'>Initiative</option>
      <option value='Saving Throw'>Saving Throw</option>
    </select>
  </React.Fragment>
);

export default DiceContext;
import React from 'react';

const DiceContext = ({context, handleChange}) => (
  <React.Fragment>
    <select className='diceInput' 
      value={context}
      name='context'
      onChange={handleChange}>
      <option value='none'>None</option>
      <option value='meleeattack'>Melee Attack</option>
      <option value='rangedattack'>Ranged Attack</option>
      <option value='spellattack'>Spell Attack</option>
      <option value='damage'>Damage</option>
      <option value='skillcheck'>Skill Check</option>
      <option value='abilitycheck'>Ability Check</option>
      <option value='combataction'>Combat Action</option>
      <option value='savingthrow'>Saving Throw</option>
    </select>
  </React.Fragment>
);

export default DiceContext;
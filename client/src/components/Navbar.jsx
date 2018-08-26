import React from 'react';
import CreateGameModal from './CreateGameModal.jsx';

const Navbar = ({toggleModal, modalState, createdGame, createdGameDesc, createNewGame, viewChange,}) => {
  return (
      <nav className="navbar is-transparent is-success" role="navigation" aria-label="main navigation">

        <div className="navbar-brand">
          <a className="navbar-brand is-size-1 has-text-white" href="#"> Dashboard </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">

              <p className="control" onClick={toggleModal}>
                <a className="button is-link">
                  Create New Game
                </a>
              </p>

              <div>
                <CreateGameModal
                  closeModal={toggleModal}
                  modalState={modalState}
                  title="Create a new game"
                >
                  <div className="input-wrapper is-size-4">
                    <label>Enter Game Name:</label>
                      <input type="text"
                        className="input"
                        placeholder="Enter Game Name"
                        name = "game-name"
                        value = {createdGame}
                        onChange = {(e) => {
                          this.handleChange(e, 'createdGame');
                        }}
                      />
                      </div>
                      <div className="input-wrapper is-size-4">
                        <label>Enter Game description:</label>
                        <textarea
                          className="textarea"
                          placeholder="Enter Game Description"
                          rows="10"
                          name = "game-description"
                          value = {createdGameDesc}
                          onChange = {(e) => {
                            this.handleChange(e, 'createdGameDesc');
                          }}
                        />
                      </div>
                      <button type="button" onClick={createNewGame}>
                        <a className="button">
                          Create New Game
                        </a>
                      </button>
                      {/* <button type="submit" onClick={() => viewChange('/game')}>Click To Game</button> */}

                </CreateGameModal>

              </div>

              <p className="control" onClick={()=> viewChange('/game')}>
                <a className="button is-link">
                  Go To Game Page
                </a>
              </p>

              <p onClick={()=> this.props.viewChange('/logout')}>
                <a className="button is-link">
                  Logout
                </a>
              </p>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;

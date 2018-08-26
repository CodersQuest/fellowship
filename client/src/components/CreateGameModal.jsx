import React from 'react';

const CreateGameModal = ({children, closeModal, modalState, title,}) => {
  if (!modalState) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}/>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal}/>
        </header>
        <section className="modal-card-body">
          <div className="content">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateGameModal;

import React from 'react';
import './Modal.scss';

const Modal = ({id="modal", onClose = () => {}, children}) => {
  const handleOutsideClick = (event) => {
    if (event.target.id === id) {
      onClose();
    }
  }

  return (
    <div id="modal" className="modal" onClick={handleOutsideClick}>
      <div className="modal-container">
        <button className="close" onClick={onClose}>X</button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
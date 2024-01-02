import React, { useEffect, useCallback } from 'react';
import css from './Modal.module.css';

const Modal = ({ imageUrl, closeModal }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.keyCode === 27) {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleClose = event => {
    if (event.target.classList.contains('overlay')) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;

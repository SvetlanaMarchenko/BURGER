import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className={styles.header}>
      <h2>{children}</h2>
      <button onClick={onClose} className={styles.closeButton}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
};

const Modal = ({ children, header, onClose }) => {
  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;

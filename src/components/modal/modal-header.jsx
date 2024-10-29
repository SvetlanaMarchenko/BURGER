import React from 'react';
import styles from './modal.module.css';

const ModalHeader = ({ onClose, children }) => {
  return (
    <div className={styles.header}>
      <h2>{children}</h2>
      <button onClick={onClose} className={styles.closeButton}>✖</button>
    </div>
  );
};

export default ModalHeader;
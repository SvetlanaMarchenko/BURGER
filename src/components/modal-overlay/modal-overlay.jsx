
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import React from 'react';
import styles from './modal-overlay.module.css';


const ModalOverlay = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}></div>
  );
};

export default ModalOverlay;
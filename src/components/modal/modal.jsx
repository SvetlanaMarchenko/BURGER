import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({ title, onClose, children }) => {
   return ReactDOM.createPortal(
     <div className="modal">
       <div className="modal-header">
         <h2 className="modal-title">{title}</h2>
         {/* <CloseIcon type="primary" onClick={onClose} /> */}
       </div>
       <div className="modal-content">
         {children}
       </div>
     </div>,
     document.getElementById('modal-root')
   );
 };
 
 export default Modal;
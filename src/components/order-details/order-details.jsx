import React from 'react';
import styles from './order-details.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import doneImage from './done.png';

const OrderDetails = ({ onClose }) => {
  
   return (
    
     <div className={styles.orderDetailsFrame}>
        <button onClick={onClose} className={`${styles.closeButton} mt-15`}>
            <CloseIcon type="primary" />
        </button>
        <p className={`${styles.countResult} mt-30 text text_type_digits-large`}>156473</p>
        <p className={`${styles.orderDetailsID} mt-8 mb-15 text text_type_main-medium`}>идентификатор заказа</p>
        <img src={doneImage} alt="OK" className={styles.modalImage} />
        <p className={`${styles.orderDetailsStatus} mb-2 mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className={`${styles.orderDetailsWaiting} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
     </div>
   );
};

export default OrderDetails;

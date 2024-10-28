import React from 'react';
import styles from './order-details.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = ({ onClose }) => {
  
   return (
    
     <div className={styles.orderDetailsFrame}>
        <p className={`${styles.countResult} mt-30 text text_type_digits-large`}>156473</p>
        <p className={`${styles.orderDetailsID} mt-8 mb-15 text text_type_main-medium`}>идентификатор заказа</p>
        <p className={`${styles.orderDetailsStatus} mb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className={`${styles.orderDetailsWaiting} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
     </div>
   );
};

export default OrderDetails;

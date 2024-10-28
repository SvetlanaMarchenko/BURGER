import React, { useState, useEffect } from 'react';
import styles from './order-details.module.css';
import { Button} from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = ({ onClose }) => {


   return (
      
     <div className={styles.orderDetailsFrame}>
        <h2>Ваш заказ</h2>
        <p>Спасибо за внимание!</p>
        <p>Открывай меня, если станет скучно :)</p>
        <Button onClick={onClose}>Закрыть</Button>
     </div>
  );
};

export default OrderDetails;

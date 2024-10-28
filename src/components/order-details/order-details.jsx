import React, { useState, useEffect } from 'react';
import styles from './order-details.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';

const OrderDetails = ({ onClose }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => setIsModalOpen(false);

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

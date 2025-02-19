import React, { FC } from 'react';
import styles from './order-details.module.css';
import doneImage from './done.png';
import { SelectCurrentOrderDetails } from '../../services/selectors';
import { useAppSelector } from '../../utils/types/hook';

const OrderDetails: React.FC = () => {
   const { orderId, isLoading, errorInOrder } = useAppSelector(SelectCurrentOrderDetails);

   const orderDetailsLayout = () => {
      if (isLoading) {
         return <p className="text text_type_main-default">Подождите.....Загрузка...</p>;
      }

      if (errorInOrder) {
         return <p className="text text_type_main-default">Что-то пошло не так. Возможно, вы не зарегистрированы или нет ни одного ингредиента в Бургере</p>;
      }

      if (orderId) {
         return (
            <div className={styles.orderDetailsFrame}>
               <p className={`${styles.countResult} mt-30 text text_type_digits-large`}>{orderId}</p>
               <p className={`${styles.orderDetailsID} mt-8 mb-15 text text_type_main-medium`} data-cy="order-number">Идентификатор заказа</p>
               <img src={doneImage} alt="OK" className={`${styles.modalImage}`} />
               <p className={`${styles.orderDetailsStatus} mb-2 mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
               <p className={`${styles.orderDetailsWaiting} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
            </div>
         );
      }
   };

   return (
      <div className={styles.orderDetailsFrame}>
         {orderDetailsLayout()}
      </div>
   );
};

export default OrderDetails;

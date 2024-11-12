import React, { useEffect, useMemo } from 'react';
import styles from './order-details.module.css';
import doneImage from './done.png';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../services/actions/order-actions';
import {selectCurrentOrderDetails} from '../../services/selectors'
import PropTypes from 'prop-types';

const OrderDetails = () => {
   // const dispatch = useDispatch();
   const { orderId, isLoading, errorInOrder } = useSelector(selectCurrentOrderDetails);
  
   // useEffect(() => {
   //    const ingredientId = []; 
   //    dispatch(createOrder(ingredientId));
   // }, [dispatch]);

    
   const orderDetailsLayout = () => {
      console.log(1)
      if (isLoading) {
         return <p className="text text_type_main-default">Подождите.....Загрузка...</p>;
      }

      if (errorInOrder) {
       return <p className="text text_type_main-default">ЧТо-то пошло не так. Сделайте заказ заново</p>;
      }

      if (orderId) {
         return(
            <div className={styles.orderDetailsFrame}>
               <p className={`${styles.countResult} mt-30 text text_type_digits-large`}>{orderId}</p>
               <p className={`${styles.orderDetailsID} mt-8 mb-15 text text_type_main-medium`}>идентификатор заказа</p>
               <img src={doneImage} alt="OK"  className={`${styles.modalImage}`}/>
               <p className={`${styles.orderDetailsStatus} mb-2 mt-15 text text_type_main-default`}>Ваш заказ начали готовить</p>
               <p className={`${styles.orderDetailsWaiting} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
            </div>
         )
       }
   }
   
   return (
      <div className={styles.orderDetailsFrame}> 
         {orderDetailsLayout()}
      </div>
   );
};

OrderDetails.propTypes = {
   onClose: PropTypes.func.isRequired
 };

export default OrderDetails;






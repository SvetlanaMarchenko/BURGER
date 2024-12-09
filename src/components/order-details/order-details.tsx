import styles from './order-details.module.css';
import doneImage from './done.png';
import { useSelector } from 'react-redux';
import {SelectCurrentOrderDetails} from '../../services/selectors'

const OrderDetails: React.FC = () => {
   const { orderId, isLoading, errorInOrder } = useSelector(SelectCurrentOrderDetails );
   const orderDetailsLayout = () => {
      if (isLoading) {
         console.log("is loding", isLoading)
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

export default OrderDetails;






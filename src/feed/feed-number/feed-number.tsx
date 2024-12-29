import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { createOrderSuccess } from '../../services/actions/order-actions'; // Убедитесь, что экшен импортирован
import style from './feed-number.module.css';
import { AppDispatch } from '../../services/store';

const FeedNumber = () => {
  const { orderId } = useParams<{ orderId: string }>(); // `orderId` как строка
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderId) {
      // Используем createOrderSuccess для обработки orderId
      dispatch(createOrderSuccess(Number(orderId))); // Преобразование строки в число
    }
  }, [dispatch, orderId]);

  return (
    <div className={style.appLayout}>
      <div className={style.postModalIngredientDetails}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default FeedNumber;

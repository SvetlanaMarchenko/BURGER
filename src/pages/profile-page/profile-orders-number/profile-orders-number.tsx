import styles from './profile-orders-number.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Order } from '../../../utils/types/orders'; 
import {Ingredient} from '../../../utils/types/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../../services/store';


interface FeedNumberProps {
  orderNumber: string | undefined;
}

export const FeedNumber: React.FC<FeedNumberProps> = ({ orderNumber }) => {
  const dispatch = useDispatch();
  const location = useLocation(); // Получаем объект location
  const locationPathname = location.pathname; // Получаем pathname

  // Запуск или закрытие WebSocket соединения при изменении пути
  useEffect(() => {
    const shouldConnectWebSocket =
      locationPathname.startsWith('/feed/') ||
      locationPathname.startsWith('/profile/orders/');

    if (shouldConnectWebSocket) {
      dispatch({ type: 'WS_CONNECTION_START' }); // Запуск WebSocket
    }

    return () => {
      if (shouldConnectWebSocket) {
        dispatch({ type: 'WS_CONNECTION_CLOSED' }); // Закрытие WebSocket
      }
    };
  }, [dispatch, locationPathname]);

  const orders = useSelector((state: RootState) => {
    const ingredientLib = state.ingredients.allIngredients;
    const rawOrders = state.wsPersonalReducer.orders;

    const fullOrders = rawOrders?.map(order => ({
      ...order,
      ingredients: order.ingredients
        ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
        .filter(Boolean),
    }));

    return fullOrders?.map((order: Order)=> {
      const orderPrice = order.ingredients.reduce((total, ingredient) => total + (ingredient?.price || 0), 0);

      const ingredientCountMap = order.ingredients.reduce((acc, ingredient) => {
        const id = ingredient?._id;
        if (id) {
          acc[id] = (acc[id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        ...order,
        ingredientCounter: ingredientCountMap,
        fullOrderPrice: orderPrice
      };
    });
  });

  const order = orders?.find((o: Order) => o.number === Number(orderNumber));

  if (!order) {
    return <p>Заказ не найден.</p>;
  }

  const uniqueIngredients = Array.from(
    new Map(
      (order.ingredients as Ingredient[]).map((ingr: Ingredient) => [ingr._id, ingr])
    ).values()
  );

  return (
    <div className={`${styles.moduleOrderLayout}`}>
      <section className={`${styles.orderDetailsMain} mt-30`}>
        <h2 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
          # {order.number}
        </h2>
        <h3 className={`${styles.orderName} text text_type_main-medium mb-3`}>
          {order.name}
        </h3>
        <div className={`${styles.statusOrder} text text_type_main-default mb-15`}>
          {order.status === 'done' && <span>Выполнен</span>}
          {order.status === 'pending' && <span className={`${styles.statusOrderOther}`}>Готовится</span>}
          {order.status === 'created' && <span className={`${styles.statusOrderOther}`}>Создан</span>}
        </div>
        <h3 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h3>
      </section>

      <section className={`${styles.orderIngredientOptions} pr-6 mb-4`}>
        {uniqueIngredients.map((ingredient: Ingredient) => (
          <div key={ingredient._id} className={`${styles.orderIngredient} mb-4`}>
            <img
              src={ingredient.image}
              className={`${styles.orderNumberImage} mr-4`}
              alt={ingredient.name || 'Ингредиент'}
            />
            <span className={`${styles.orderIngredientName} text text_type_main-default`}>
              {ingredient.name}
            </span>
            <div className={styles.orderIngredientPrice}>
            <span className={`text text_type_digits-default`}>
              {order.ingredientCounter[ingredient._id]} x {ingredient.price}
            </span>
            <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </section>

      <section className={`mt-10 ${styles.orderResult}`}>
      <FormattedDate
                  className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
                  date={new Date(order.createdAt)}
                />
        <span className="text text_type_digits-default">{order.fullOrderPrice}</span>
        <CurrencyIcon type="primary" />
      </section>
    </div>
  );
};

export default FeedNumber;

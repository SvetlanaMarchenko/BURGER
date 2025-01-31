import styles from './feed-number.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Order } from '../../../utils/types/orders'; 
import { Ingredient } from '../../../utils/types/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppDispatch, RootState } from '../../../services/store';
import { fetchDataOrdersAndSetCurrent } from '../../../services/actions/current-order-actions';
import { fetchDataIngredients } from '../../../services/actions/ingredients-actions';

interface FeedNumberProps {
   orderNumber: string | undefined ;
}

export const FeedNumber: React.FC<FeedNumberProps> = ({ orderNumber }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем заказы и ингредиенты из Redux
  const orders = useSelector((state: RootState) => {
    const ingredientLib = state.ingredients.allIngredients;
    const rawOrders = state.orders.orders;

    // Маппинг заказов с ингредиентами
    const fullOrders = rawOrders?.map((order: Order) => ({
      ...order,
      ingredients: order.ingredients
        ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
        .filter(Boolean),
    }));

    return fullOrders;
  });

  // Получаем параметр 'number' из URL
  const { number } = useParams<{ number: string }>();
  const parsedNumber = number ? Number(number) : undefined;

  // Загружаем данные о заказах и ингредиентах при монтировании компонента
  useEffect(() => {
    if (parsedNumber) {
      dispatch(fetchDataOrdersAndSetCurrent(parsedNumber)); // Получаем все заказы
    }
  }, [dispatch, parsedNumber]);

  useEffect(() => {
    dispatch(fetchDataIngredients()); // Загружаем ингредиенты
  }, [dispatch]);

  // Находим нужный заказ по номеру
  const order = orders?.find((o: Order) => o.number === parsedNumber);

  if (!order) {
    return <p>Подождите.</p>;
  }

  // Маппинг ингредиентов для заказа
  const uniqueIngredients = Array.from(
    new Map(
      (order.ingredients as Ingredient[]).map((ingr: Ingredient) => [ingr._id, ingr])
    ).values()
  );

  // Подсчитаем количество каждого ингредиента в заказе
  const ingredientCountMap = order.ingredients.reduce((acc, ingredient) => {
    const id = ingredient?._id;
    if (id) {
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Рассчитаем общую цену заказа
  const orderPrice = order.ingredients.reduce((total, ingredient) => total + (ingredient?.price || 0), 0);

  return (
    <div className={`${styles.moduleOrderLayout}`}>
      <section className={`${styles.orderDetailsMain} mt-30`}>
        <h2 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
          # {order.number} {/* Отображаем номер заказа */}
        </h2>
        <h3 className={`${styles.orderName} text text_type_main-medium mb-3`}>
          {order.name} {/* Отображаем имя заказа */}
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
              {ingredient.name} {/* Отображаем имя ингредиента */}
            </span>
            <div className={styles.orderIngredientPrice}>
              <span className={`text text_type_digits-default`}>
                {ingredientCountMap[ingredient._id]} x {ingredient.price} {/* Количество и цена */}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </section>

      <section className={`mt-10 ${styles.orderResult}`}>
        <FormattedDate
          className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
          date={new Date(order.createdAt)} // Дата создания заказа
        />
        <span className="text text_type_digits-default">{orderPrice}</span> {/* Общая цена */}
        <CurrencyIcon type="primary" />
      </section>
    </div>
  );
};

export default FeedNumber;

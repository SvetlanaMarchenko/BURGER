import styles from './feed-number.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import useWebSocketOrders from '../../../services/use-ws-order-profile';
import { Order } from '../../../utils/types/orders'; 
import {Ingredient} from '../../../utils/types/ingredients';


interface FeedNumberProps {
  orderNumber: number | string;
}

export const FeedNumber: React.FC<FeedNumberProps> = ({ orderNumber }) => {
  const { orders } = useWebSocketOrders('/feed'); 

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
            <span className="text text_type_digits-default">
              {order.ingredientCounter[ingredient._id]} x {ingredient.price}
            </span>
            <CurrencyIcon type="primary" />
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

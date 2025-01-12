import { useEffect } from 'react';
import styles from './feed.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const OrderCard = ({ order }: { order: any }) => (
    <div key={order._id}>
      <div className={`${styles.orderName} mb-6`}>
        <div className={`${styles.orderNumber} mt-6 mb-6`}>
          <div className="text text_type_digits-default"># {order.number}</div>
          <div className="text text_type_main-default text_color_inactive">{order.createdAt}</div>
        </div>
        <div className={`text text_type_main-medium mb-6`}>{order.name}</div>
        <div>
          <div className={`${styles.orderListAndCost} mb-6`}>
            {order.ingredientsToShow.map((ingredient, index) => (
              <div key={index}>
                <img src={ingredient?.image} className={styles.orderImage} alt="Ингредиент" />
              </div>
            ))}
            {order.extraIngredients > 0 && (
              <div className={styles.extraIngredients}>+{order.extraIngredients}</div>
            )}
          </div>
          <div className="text text_type_main-medium">
            Стоимость: {order.fullOrderPrice} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
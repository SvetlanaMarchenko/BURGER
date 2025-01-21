import React, { useEffect } from 'react';
import styles from './profile-orders.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationProfilePage from '../navigation-profile-page';
import useWebSocketOrders from '../../../services/use-ws-order-profile';
import { Order } from '../../../utils/types/orders';
import { useDispatch } from 'react-redux';
import { WS_CLEAR_ORDERS } from '../../../services/actions/ws-action-types';
import { Ingredient } from '../../../utils/types/ingredients';

export function ProfileOrders() {
  const maxIngredientsInRow = 6;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useWebSocketOrders(location.pathname);

  // useEffect(() => {
  //   if (location.pathname === '/feed') {
  //     dispatch({ type: WS_CLEAR_ORDERS });
  //   }
  // }, [location.pathname, dispatch]);

  const handleOrderClick = (order: Order) => {
    navigate(`/profile/orders/${order.number}`, { state: { backgroundLocation: location } });
  };

  const renderIngredients = (order: Order) => {
    return order.ingredientsToShow?.slice(0, maxIngredientsInRow).map((ingredient: Ingredient, index: number) => (
      <div
        key={index}
        className={`${styles.orderImageWrapper} ${
          index === maxIngredientsInRow - 1 && order.extraIngredients > 0
            ? styles.blurImageWrapper
            : ''
        }`}
      >
        <img
          src={ingredient?.image}
          className={order.extraIngredients > 0 && index === 5 ? styles.blurImage : styles.orderImage}
          alt="Ингредиент"
        />
        {index === maxIngredientsInRow - 1 && order.extraIngredients > 0 && (
          <div className={styles.extraIngredients}>+{order.extraIngredients}</div>
        )}
      </div>
    ));
  };

  return (
    <div className={styles.profileOrder}>
      <NavigationProfilePage />

      <div className={styles.ingredientsBox}>
        <div className={`${styles.ingredientsSection} mt-10`}>
          <main className={styles.scrollContainer}>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <section
                  key={order.number}
                  className={`${styles.orderSection} mb-6`}
                  onClick={() => handleOrderClick(order)}
                >
                  <div className={styles.orderNumber}>
                    <p className="text text_type_digits-default mb-6"># {order.number}</p>
                    <FormattedDate
                      className="text text_type_main-default text_color_inactive"
                      date={new Date(order.createdAt)}
                    />
                  </div>

                  <h2 className={`${styles.orderName} text text_type_main-medium mb-2`}>
                    {order.name}
                  </h2>
                  <p className={`${styles.statusOrder} text text_type_main-default mb-6`}>
                    {order.status === 'done' ? 'Выполнен' : 'В процессе'}
                  </p>

                  <div className={styles.orderResult}>
                    <div className={styles.orderListAndCost}>{renderIngredients(order)}</div>

                    <div className={styles.orderPrice}>
                      <p className="text text_type_digits-default">{order.fullOrderPrice}</p>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <p className="text text_type_main-medium">Загрузка заказов...</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

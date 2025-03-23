
import styles from './feed.module.css';
import { OrderCard } from './order-card';
import { useLocation, useNavigate } from 'react-router-dom';
import useWebSocketOrders from '../../../services/use-ws-order-profile';
import { Order } from '../../../utils/types/orders';

export function Feed() {
  const location = useLocation();
  const navigate = useNavigate();

  const { orders, total, totalToday } = useWebSocketOrders(location.pathname);

  const handleOrderClick = (order: Order) => {
    navigate(`/feed/${order.number}`, { state: { backgroundLocation: location } });
  };

  const openModal = (order: Order) => {
    handleOrderClick(order);
  };

  return (
    <div className={styles.appLayout}>
      <div className={styles.ingredientsBox}>
        <div className={`${styles.ingredientsSection} mt-10`}>
          <h1 className={`${styles.mainTitle} text text_type_main-large`}>Лента заказов</h1>
          <div className={`${styles.burgerBar} mt-6`} />

          <main className={styles.scrollContainer}>
            <section className={styles.orderSection}>
              {orders?.map(order => (
                <OrderCard key={order.number} order={order} openModal={openModal} />
              ))}
            </section>
          </main>
        </div>

        <div className={`${styles.ordersList} text text_type_main-large ml-15 mt-25`}>
          <div className={`${styles.subheading} mb-6`}>
            <h1 className={`${styles.orderListBox} text text_type_main-medium`}>Готовы:</h1>
            <h1 className={`${styles.orderListBox} text text_type_main-medium ml-9`}>В работе:</h1>
          </div>
          <div className={`${styles.ordersColumn} text text_type_digits-default`}>
            {orders?.length > 0 ? (
              <>
                <div className={styles.orderListResultDone}>
                  {orders
                    .filter((order) => order.status === 'done')
                    .slice(0, 5)
                    .map((order) => (
                      <div key={order._id}>{order.number}</div>
                    ))}
                </div>
                <div className={`${styles.orderListResultInProgress} ml-9`}>
                  {orders
                    .filter((order) => order.status === 'pending')
                    .slice(0, 5)
                    .map((order) => (
                      <div key={order._id}>{order.number}</div>
                    ))}
                </div>
              </>
            ) : (
              <div>Загрузка заказов...</div>
            )}
          </div>

          <h1 className="text text_type_main-medium mt-10">Выполнено за все время:</h1>
          <h1 className="text text_type_digits-large mb-10">{total}</h1>
          <h1 className="text text_type_main-medium">Выполнено за сегодня:</h1>
          <h1 className="text text_type_digits-large mb-10">{totalToday}</h1>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { fetchDataIngredients, fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import { OrderCard } from './order-card';

import { useParams, useLocation, useNavigate,  } from 'react-router-dom';
import { Order} from '../../utils/types/orders';
import FeedNumber from '../feed/feed-number/feed-number';



export function Feed() {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const location = useLocation(); // Текущий маршрут
  const navigate = useNavigate();

  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);

  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);

  useEffect(() => {
    const shouldConnectWebSocket =
      location.pathname.startsWith('/feed') ||
      location.pathname.startsWith('/profile');
  
    if (shouldConnectWebSocket && !wsConnected) {
      dispatch({ type: 'WS_CONNECTION_START' }); // Запуск WebSocket
    }
  
    // Очистка подключения при выходе с этих страниц
    return () => {
      if (wsConnected && !shouldConnectWebSocket) {
        dispatch({ type: 'WS_CONNECTION_CLOSED' }); // Закрытие WebSocket
      }
    };
  }, [dispatch, location.pathname, wsConnected]);


  const maxIngredientsInRow = 6;

  const orders = useSelector((state: RootState) => {
    const ingredientLib = state.ingredients.allIngredients;
    const rawOrders = state.wsReducer.orders;

    const fullOrders = rawOrders?.map(order => ({
      ...order,
      ingredients: order.ingredients
        ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
        .filter(Boolean),
    }));

    return fullOrders?.map(order => {
      const orderPrice = order.ingredients.reduce((total, ingredient) => total + (ingredient?.price || 0), 0);
      return {
        ...order,
        fullOrderPrice: orderPrice,
        ingredientsToShow: order.ingredients.slice(0, maxIngredientsInRow),
        extraIngredients: Math.max(order.ingredients.length - maxIngredientsInRow, 0),
      };
    });
  });

  const total = useSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useSelector((state: RootState) => state.wsReducer.totalToday);



  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    // Получение прокрутки
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  const handleOrderClick = (order: Order) => {
    navigate(`/feed/${order.number}`, { state: { backgroundLocation: location } });
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для отображения модального окна
  const [selectedOrder, setSelectedOrder] = useState(null); // Состояние для хранения выбранного заказа

  const openModal = (order: any) => {
    handleOrderClick(order)
    // setSelectedOrder(order);  // Сохраняем выбранный заказ
    // setIsModalOpen(true);  // Открываем модальное окно
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Закрываем модальное окно
    setSelectedOrder(null);  // Очищаем выбранный заказ
  };


  return (
    <div className={styles.appLayout}>
        <div className={styles.ingredientsBox}>
          <div className={`${styles.ingredientsSection} mt-10`}>
            <h1 className={`${styles.mainTitle} text text_type_main-large`}>Лента заказов</h1>
            <div className={`${styles.burgerBar} mt-6`} />

            <main className={styles.scrollContainer} >
              <section 
                className={styles.orderSection} 
                onScroll={handleScroll}

              >

              {orders?.map(order => {
                return (
                  <OrderCard
                    key={order.number} 
                    order={order}
                    openModal={openModal} 
                  />
                );
              })}
                              

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
                    {orders.filter(order => order.status === "done").slice(0, 5).map(order => (
                      <div key={order._id}>{order.number}</div>
                    ))}
                  </div>
                  <div className={`${styles.orderListResultInProgress} ml-9`}>
                    {orders.filter(order => order.status === "pending").slice(0, 5).map(order => (
                      <div key={order._id}>{order.number}</div>
                    ))}
                  </div>
                </>
              ) : (
                <div>Загрузка заказов...</div>
              )}
            </div>

            <h1 className="text text_type_main-medium mt-15">Выполнено за все время:</h1>
            <h1 className="text text_type_digits-large mb-15">{total}</h1>
            <h1 className="text text_type_main-medium">Выполнено за сегодня:</h1>
            <h1 className="text text_type_digits-large mb-15">{totalToday}</h1>

            {/* {isModalOpen && selectedOrder && (
          <FeedNumber order={selectedOrder} onClose={closeModal} />
        )} */}
          </div>
        </div>
    </div>
  );
}

import { useEffect } from 'react';
import styles from './feed.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IngredientItem from '../../components/burger-ingredients/ingredient-item';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Order } from '../../utils/types/orders';
import { useDispatch, useSelector } from 'react-redux'; // useSelector для получения данных из состояния
import { RootState } from '../../services/store'; // Путь может отличаться
import { fetchDataIngredients } from '../../services/actions/ingredients-actions';

export function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);
  
  
  // Получаем заказы из состояния
  const orders = useSelector((state: RootState) => {
    console.log("state: ", state)
    const ingredientLib = state.ingredients.allIngredients
    const rawOrders = state.wsReducer.orders
    console.log("rawOrders: ", rawOrders)
    const fullOrders = rawOrders?.map(ro => {
      return {
        ...ro,
        ingredients: ro.ingredients?.map(oi => {
          return ingredientLib.find(il => il._id === oi)  
        })
      };
    })
  
    console.log("fullOrders:", fullOrders)

    return fullOrders;
  }); 
  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected); // Статус подключения
  const total = useSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useSelector((state: RootState) => state.wsReducer.totalToday);

  // Подключаем WebSocket
  const startWebSocket = () => {
    dispatch({ type: 'WS_CONNECTION_START' }); // Начинаем соединение
  };

  // Заглушка для демонстрации
  const value = 'Пример заголовка';
  const item = { _id: 123, name: 'Пример ингредиента примерный' };

  const navigate = (path: string, state: object) => {
    console.log(`Navigating to ${path}`, state);
  };

  // Обработчик скролла
  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  // const openModal = (item: Order) => {
  //   dispatch(setCurrentIngredient(item));
  // };





  return (
    <div className={`${styles.appLayout}`}>
      <DndProvider backend={HTML5Backend}>
        <div className={`${styles.ingredientsBox}`}>
          <div className={`${styles.ingredientsSection} mt-10`}>
            <h1 className={`${styles.mainTitle} text text_type_main-large`}>Лента заказов</h1>

            <div className={`${styles.burgerBar} mt-6`} />

            <main className={styles.scrollContainer} onScroll={handleScroll}>
              <section className={`${styles.orderSection}`}>
                
                <div>
                  {orders && orders.length > 0 ? (
                    
                    <div className={`${styles.orderName} mb-6`}>
                      <div className={`${styles.orderNumber} mt-6 mb-6`}>
                      <div className="text text_type_digits-default"># {orders[0].number}</div>
                      <div className="text text_type_main-default text_color_inactive">{orders[0].createdAt}</div>
                    </div>
                      <div className={` text text_type_main-medium mb-6`}>{orders[0].name}</div>
                        <div>
                          <img src={orders[0].ingredients[0].image} alt="OK" />
                          <CurrencyIcon type="primary" className="ml-2" />
                        </div>

                    </div>
                  ) : (
                    <div>Загрузка заказов...</div>
                  )}
                </div>


                    <button onClick={startWebSocket}>
      Start WebSocket
    </button>

              </section>
            </main>
          </div>




          <div className={`${styles.ordersList} text text_type_main-large ml-15 mt-25`}>
          <div className={`${styles.subheading} mb-6`}>
            <h1 className={`${styles.orderListBox} text text_type_main-medium`}>Готовы:</h1>
            <h1 className={`${styles.orderListBox} text text_type_main-medium ml-9`}>В работе:</h1>
          </div>

          <div className={`${styles.ordersColumn} text text_type_digits-default`}>

            {orders && orders.length > 0 ? (
              <>
                {/* Заказы со статусом "done" */}
                {orders.filter(order => order.status === "done").length > 0 ? (
                  <div className={`${styles.orderListResultDone}`}>
                    {orders
                      .filter(order => order.status === "done")
                      .slice(0, 5)
                      .map(order => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                  </div>
                ) : (
                  <div>0</div>
                )}

                {/* Заказы со статусом "pending" */}
                {orders.filter(order => order.status === "pending").length > 0 ? (
                  <div className={`${styles.orderListResultInProgress} ml-9`}>
                    {orders
                      .filter(order => order.status === "pending")
                      .slice(0, 5)
                      .map(order => (
                        <div key={order._id}>{order.number}</div>
                      ))}
                  </div>
                ) : (
                  <div className='ml-9'>0</div>
                )}
              </>
            ) : (
              <div>Загрузка заказов...</div>
            )}
          </div>


          <h1 className={`text text_type_main-medium mt-15`}>Выполнено за все время:</h1>
          <h1 className={`text text_type_digits-large mb-15`}>{total}</h1>
          <h1 className={`text text_type_main-medium`}>Выполнено за сегодня:</h1>
          <h1 className={`text text_type_digits-large mb-15`}>{totalToday}</h1>
        </div>




        </div>
      </DndProvider>
    </div>
  );
}

import styles from './feed.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IngredientItem from '../../components/burger-ingredients/ingredient-item';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Order } from '../../utils/types/orders';
import { useDispatch, useSelector } from 'react-redux'; // useSelector для получения данных из состояния
import { RootState } from '../../services/store'; // Путь может отличаться

export function Feed() {
  const dispatch = useDispatch();
  
  // Получаем заказы из состояния
  const orders = useSelector((state: RootState) => state.wsReducer.orders); 
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
                <div className={`${styles.orderNumber}`}>
                <div className="text text_type_digits-default">Номер заказа</div>
                <div>
                  {/* <p className="text text_type_main-default text_color_inactive">{orders[0].createdAt}</p> */}
                </div>
                </div>

                {/* <IngredientItem
                  className={`${styles.nazvanieBurgera} mb-6`}
                  key={item._id}
                  item={item}
                  onClick={() => {
                    navigate(`/orders/${item.number}`, {state: {backgroundLocation: '/'}})
                    return openModal(item)
                  }}
                /> */}

          <div>
            
            {orders && orders.length > 0 ? (
              <div>
                {/* Display the ID */}
                <p>Название: {orders[0]._id}</p>
                
                {/* Display the image (if _id is supposed to be a URL, otherwise update the src to a valid image URL) */}
                <img src={orders[0]._id} alt="OK" />
                
                {/* Display the number */}
                <p>Номер: {orders[0].number}</p>
                <p>{orders[0].createdAt}</p>
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



          {/* <BurgerConstructor className=" mr-4" /> */}
          <div className={`${styles.ordersList} text text_type_main-large ml-15 mt-10`}>
            <div className={`${styles.subheading}  mb-6`}>
              <h1 className={` ${styles.orderListBox} text text_type_main-medium`}>Готовы: </h1>
              
              <h1 className={` ${styles.orderListBox} text text_type_main-medium ml-9`}>В работе:</h1>
            </div>

              <div className={`${styles.orderListResultInProgress} text text_type_digits-medium`}>
                {orders.slice(0, 5).map((order, index) => (
                  <div key={order._id || index}>{order.number}</div>
                ))}
              </div>
              
            

            
            <h1 className={` text text_type_main-medium mt-15`}>Выполнено за все время:</h1>
            <h1 className={` text text_type_digits-large mb-15`}>{total}</h1>
            <h1 className={` text text_type_main-medium`}>Выполнено за сегодня:</h1>
            <h1 className={` text text_type_digits-large mb-15`}>{totalToday}</h1>
          </div>



        </div>
      </DndProvider>
    </div>
  );
}

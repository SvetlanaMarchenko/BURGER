import styles from './feed.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import IngredientItem from '../../components/burger-ingredients/ingredient-item';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'; 
import { Order } from '../../utils/types/orders';
import { useDispatch } from 'react-redux';


export function Feed() {
  const dispatch = useDispatch();
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

  const openModal = (item: Order) => {
    dispatch(setCurrentIngredient(item));
  };

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
                  <FormattedDate className="text text_type_main-default text_color_inactive" date={new Date()} />
                </div>
                </div>

                <IngredientItem
                  className={`${styles.nazvanieBurgera} mb-6`}
                  key={item._id}
                  item={item}
                  onClick={() => {
                    navigate(`/orders/${item.number}`, {state: {backgroundLocation: '/'}})
                    return openModal(item)
                  }}
                />
                    <button onClick={startWebSocket}>
      Start WebSocket
    </button>
              </section>
            </main>
          </div>



          {/* <BurgerConstructor className=" mr-4" /> */}
          <div className={`${styles.ordersList} text text_type_main-large ml-15 mt-10`}>
            <div className={`${styles.subheading}  mb-6`}>
              <h1 className={` ${styles.orderListBox} text text_type_main-medium`}>Готовы:</h1>
              <h1 className={` ${styles.orderListBox} text text_type_main-medium ml-9`}>В работе:</h1>
            </div>
            <h1 className={` text text_type_main-medium mt-15`}>Выполнено за все время:</h1>
            <h1 className={` text text_type_digits-large mb-15`}>12435</h1>
            <h1 className={` text text_type_main-medium`}>Выполнено за сегодня:</h1>
            <h1 className={` text text_type_digits-large mb-15`}>124</h1>
          </div>



        </div>
      </DndProvider>
    </div>
  );
}

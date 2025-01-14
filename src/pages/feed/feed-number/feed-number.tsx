import styles from './feed-number.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { fetchDataIngredients } from '../../../services/actions/ingredients-actions';

const FeedNumber = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);

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

  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);
  const total = useSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useSelector((state: RootState) => state.wsReducer.totalToday);

  const value = 'Пример заголовка самый примерный пример';
  const item = { _id: '123564875', name: 'Пример ингредиента примерный', img: 'img', quantity: 2, price: 300 };

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  const startWebSocket = () => {
    if (!wsConnected) {
      dispatch({ type: 'WS_CONNECTION_START' });
    }
  };

  return (
    
    <div className={`${styles.moduleOrderLayout}`}>
      {!wsConnected && <button onClick={startWebSocket}>Start WebSocket</button>}
      {orders?.length > 0 ? (
        <>
        
          <section className={`${styles.orderDetailsMain} mt-30`}>
            <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
              # {orders[0].number}
            </h1>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
            {orders[0].name}
            </h1>
            <h1 className={`${styles.statusOrder} text text_type_main-default mb-15`}>Выполнен</h1>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h1>
          </section>

          <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll}>
            <div className={`${styles.orderIngredient} mb-4 text text_type_main-default text_color_inactive`}>
              <div>
                <h1 className="text text_type_main-default mr-4">{item.img}</h1>
              </div>
              <div className={styles.orderIngredientName}>
                <p className="text text_type_main-medium">{item.name}</p>
              </div>
              <div>
                <p className="text text_type_digits-default">
                  {item.quantity} x {item.price}
                </p>
              </div>
              <CurrencyIcon type="primary" className="ml-2" />
            </div>
          </section>

          <section className={`mt-10 ${styles.orderResult}`}>
            <FormattedDate
              className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
              date={new Date()}
            />
            <p className="text text_type_digits-default">{item.price}</p>
            <CurrencyIcon type="primary" className="ml-2" />
          </section>
        </>
      ) : (
        <p>Загрузка заказов...</p>
      )}
    </div>
  );
};

export default FeedNumber;

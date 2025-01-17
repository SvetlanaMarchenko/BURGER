import styles from './feed-number.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../services/store';
import { fetchDataIngredients } from '../../../services/actions/ingredients-actions';

const FeedNumber = ({ orderNumber }: { orderNumber: any}) => {
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

      const ingredientCount = order.ingredients.reduce((acc: Record<string, number>, ingredient) => {
        if (ingredient && ingredient._id) {
          acc[ingredient._id] = (acc[ingredient._id] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        ...order,
        fullOrderPrice: orderPrice,
        ingredientsToShow: order.ingredients.slice(0, maxIngredientsInRow),
        extraIngredients: Math.max(order.ingredients.length - maxIngredientsInRow, 0),
        numberOfRepeatedIngredient: ingredientCount,
      };
    });
  });

  const order = orders.find(o => o.number === parseInt(orderNumber))
  // const order = fullOrders

  // const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    console.log('Scrolled:', event.currentTarget.scrollTop);
  };

  // const startWebSocket = () => {
  //   if (!wsConnected) {
  //     dispatch({ type: 'WS_CONNECTION_START' });
  //   }
  // };

  return (
    <div className={`${styles.moduleOrderLayout}`}> 
      <section className={`${styles.orderDetailsMain} mt-30`}>
        <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
          # {order.number}
        </h1>
        <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
          {order.name}
        </h1>
        <div className={`${styles.statusOrder} text text_type_main-default mb-15`}>
          {order.status === "done" && <div>Выполнен</div>}
          {order.status === "pending" && <div className={`${styles.statusOrderOther}`}>Готовится</div>}
          {order.status === "created" && <div className={`${styles.statusOrderOther}`}>Создан</div>}
        </div>
        <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h1>
      </section>

      <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll}>
        {Array.from(
          new Map(
            order.ingredients.map((ingredient) => [ingredient._id, ingredient])
          ).values()
        ).map((ingredient, index) => (
          <div
            key={index}
            className={`${styles.orderIngredient} mb-4 text text_type_main-default`}
          >
            <div>
              <img
                src={ingredient?.image}
                className={`${styles.orderNumberImage} text text_type_main-default mr-4`}
                alt={ingredient?.name || "Ингредиент"}
              />
            </div>
            <div className={`${styles.orderIngredientName} text text_type_main-default`}>
              {ingredient?.name}
            </div>
            <div>
              <p className="text text_type_digits-default">
                {ingredient.price}
              </p>
            </div>
            <CurrencyIcon type="primary" className="ml-2" />
          </div>
        ))}
      </section>

      <section className={`mt-10 ${styles.orderResult}`}>
        <div
          className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
        >
          {order.createdAt}
        </div>
        <p className="text text_type_digits-default">{order.fullOrderPrice}</p>
        <CurrencyIcon type="primary" className="ml-2" />
      </section>

          

      {/* {!wsConnected && <button onClick={startWebSocket}>Start WebSocket</button>}
      {orders?.length > 0 ? (
        <>
          <section className={`${styles.orderDetailsMain} mt-30`}>
            <h1 className={`${styles.orderNumber} text text_type_digits-default mb-10`}>
              # {order.number}
            </h1>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-3`}>
              {order.name}
            </h1>
            <div className={`${styles.statusOrder} text text_type_main-default mb-15`}>
              {order.status === "done" && <div>Выполнен</div>}
              {order.status === "pending" && <div className={`${styles.statusOrderOther}`}>Готовится</div>}
              {order.status === "created" && <div className={`${styles.statusOrderOther}`}>Создан</div>}
            </div>
            <h1 className={`${styles.orderName} text text_type_main-medium mb-6`}>Состав:</h1>
          </section>

          <section className={`${styles.orderIngredientOptions} pr-6 mb-4`} onScroll={handleScroll}>
  {Array.from(
    new Map(
      order.ingredients.map((ingredient) => [ingredient._id, ingredient])
    ).values()
  ).map((ingredient, index) => (
    <div
      key={index}
      className={`${styles.orderIngredient} mb-4 text text_type_main-default`}
    >
      <div>
        <img
          src={ingredient?.image}
          className={`${styles.orderNumberImage} text text_type_main-default mr-4`}
          alt={ingredient?.name || "Ингредиент"}
        />
      </div>
      <div className={`${styles.orderIngredientName} text text_type_main-default`}>
        {ingredient?.name}
      </div>
      <div>
        <p className="text text_type_digits-default">
          {ingredient.price}
        </p>
      </div>
      <CurrencyIcon type="primary" className="ml-2" />
    </div>
  ))}
</section>


          <section className={`mt-10 ${styles.orderResult}`}>
            <div
              className={`${styles.orderTime} text text_type_main-default text_color_inactive`}
            >
              {order.createdAt}
            </div>
            <p className="text text_type_digits-default">{order.fullOrderPrice}</p>
            <CurrencyIcon type="primary" className="ml-2" />
          </section>
        </>
      ) : (
        <p>Загрузка заказов...</p>
      )} */}
    </div>
  );
};

export default FeedNumber;
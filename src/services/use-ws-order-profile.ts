import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { fetchDataIngredients } from '../services/actions/ingredients-actions';
import { WS_CLEAR_ORDERS, WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../services/actions/ws-action-types';

const useWebSocketOrders = (locationPathname: string) => {
  const dispatch = useDispatch();
  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);
  const maxIngredientsInRow = 6;

  // Загружаем ингредиенты один раз при монтировании
  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);

  // Подключение к WebSocket
  useEffect(() => {
    // dispatch({ type: WS_CLEAR_ORDERS }); // по факту это CLEAR_ORDERS_AND_RESTART
    // dispatch({ type: WS_CONNECTION_START });
    // const shouldConnectWebSocket =
      // locationPathname.startsWith('/feed') 

    // if (!wsConnected) {
    //   dispatch({ type: WS_CONNECTION_START }); // Запуск WebSocket
    //   // window.location.reload()
    // }

    // return () => {
    //   if (wsConnected) {
    //     dispatch({ type: WS_CONNECTION_CLOSED }); // Закрытие WebSocket
    //     dispatch({ type: WS_CLEAR_ORDERS }); // Очистка данных в wsReducer
    //   }
    // };
  }, [dispatch]);

  // Обработка заказов
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

      const ingredientCountMap = order.ingredients.reduce((acc, ingredient) => {
        const id = ingredient?._id;
        if (id) {
          acc[id] = (acc[id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return {
        ...order,
        ingredientCounter: ingredientCountMap,
        fullOrderPrice: orderPrice,
        ingredientsToShow: order.ingredients.slice(0, maxIngredientsInRow),
        extraIngredients: Math.max(order.ingredients.length - maxIngredientsInRow, 0),
      };
    });
  });

  const total = useSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useSelector((state: RootState) => state.wsReducer.totalToday);

  return { wsConnected, orders, total, totalToday };
};

export default useWebSocketOrders;

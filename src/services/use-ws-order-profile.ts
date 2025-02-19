import { useEffect } from 'react';
import { RootState } from '../services/store';
import { Ingredient } from '../utils/types/ingredients';
import { RawOrder } from '../utils/types/raw-orders';
import { createSelector } from 'reselect';
import { useAppDispatch, useAppSelector } from '../utils/types/hook';
import { fetchDataIngredients } from './actions/data-ingredients';

const useWebSocketOrders = (pathname: string) => {
  const dispatch = useAppDispatch()
  const wsConnected = useAppSelector((state: RootState) => state.wsReducer.wsConnected);
  const maxIngredientsInRow = 6;


  useEffect(() => {
    dispatch(fetchDataIngredients());
    dispatch({ type: 'WS_CONNECTION_START' });
    return function cleanup() {
      dispatch({ type: 'WS_CONNECTION_CLOSE' });
    };
  }, [dispatch]);


  const orders = useAppSelector(createSelector(
    [(state: RootState) => state.wsReducer.orders, (state: RootState) => state.ingredients.allIngredients],
    (rawOrders, ingredientLib) => {
      const fullOrders = rawOrders?.map((order: RawOrder) => ({
        ...order,
        ingredients: order.ingredients
          ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
          .filter(Boolean) as Ingredient[],
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
    }
  ));

  const total = useAppSelector((state: RootState) => state.wsReducer.total);
  const totalToday = useAppSelector((state: RootState) => state.wsReducer.totalToday);

  return { wsConnected, orders, total, totalToday };
};

export default useWebSocketOrders;

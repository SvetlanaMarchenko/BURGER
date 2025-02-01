import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/store';
import { fetchDataIngredients } from '../services/actions/ingredients-actions';
import { Ingredient } from '../utils/types/ingredients';
import { RawOrder } from '../utils/types/raw-orders';

const useWebSocketOrders = (pathname: string) => {
  const dispatch = useDispatch<AppDispatch>()
  const wsConnected = useSelector((state: RootState) => state.wsReducer.wsConnected);
  const maxIngredientsInRow = 6;


  useEffect(() => {
    dispatch(fetchDataIngredients());
  }, [dispatch]);


  const orders = useSelector((state: RootState) => {
    const ingredientLib = state.ingredients.allIngredients;
    const rawOrders = state.wsReducer.orders;

    const fullOrders = rawOrders?.map((order: RawOrder) => ({
      ...order,
      ingredients: order.ingredients
      ?.map(id => ingredientLib.find(ingredient => ingredient?._id === id))
      .filter(Boolean) as Ingredient[]
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

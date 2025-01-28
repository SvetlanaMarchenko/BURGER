
import { Order } from '../../utils/types/orders';

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const CLEAR_CURRENT_ORDER  = 'CLEAR_CURRENT_ORDER';

export const setCurrentOrder= (order: Order) => ({
  type: SET_CURRENT_ORDER,
  payload: order
});

export const clearCurrentIOrder = () => ({
  type: CLEAR_CURRENT_ORDER,
});

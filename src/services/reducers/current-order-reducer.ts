import {
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER,
} from '../actions/current-order-actions';
import { Order } from '../../utils/types/orders';

type CurrentOrderState = Order | null;

const initialState: CurrentOrderState = null;

const currentOrdersReducer = (
  currentOrderState = initialState,
  action: { type: string; payload?: Order }
): CurrentOrderState => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.payload || null; 
    case CLEAR_CURRENT_ORDER:
      return null;
    default:
      return currentOrderState;
  }
};

export default currentOrdersReducer;

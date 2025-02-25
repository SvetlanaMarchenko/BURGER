import { RawOrders } from '../../utils/types/raw-orders';
import { AppActions, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from '../actions/current-order-actions';

interface RawOrdersState {
  orders: RawOrders | [];
  loading: boolean;
  error: string | null;
}

export const initialState: RawOrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const ordersReducer = (state = initialState, action: AppActions): RawOrdersState => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload, 
        loading: false,
        error: null,
      };

    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };

    default:
      return state;
  }
};

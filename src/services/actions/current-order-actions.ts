import { Orders } from '../../utils/types/orders';
import { requestFromApi } from '../../utils/api';
import { AppDispatch } from '../store';

// Action Types
export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

// Action Creators
export const fetchOrdersRequest = (): { type: typeof FETCH_ORDERS_REQUEST } => ({
  type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders: Orders): { type: typeof FETCH_ORDERS_SUCCESS; payload: Orders } => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error: string): { type: typeof FETCH_ORDERS_FAILURE; payload: string } => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error
});

// Thunk Action Creator for fetching orders and setting the current order
export const fetchDataOrdersAndSetCurrent = (number: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchOrdersRequest());

    try {
      const json = await requestFromApi(`/orders/${number}`);
      const fetchedOrders = json.orders;

      if (fetchedOrders) {
        dispatch(fetchOrdersSuccess(fetchedOrders));
      } else {
        console.error('No order with number ', number);
        dispatch(fetchOrdersFailure('Order not found'));
      }
    } catch (error) {
      dispatch(fetchOrdersFailure('Что-то точно не так'));
    }
  };
};

// Action types for Redux
export type FetchOrdersRequestAction = ReturnType<typeof fetchOrdersRequest>;
export type FetchOrdersSuccessAction = ReturnType<typeof fetchOrdersSuccess>;
export type FetchOrdersFailureAction = ReturnType<typeof fetchOrdersFailure>;

// Combining all actions in AppActions
export type AppActions =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction
  | SetCurrentOrderAction; // Make sure you have this SetCurrentOrderAction type somewhere in your code

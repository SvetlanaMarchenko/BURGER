import { RawOrders } from '../../utils/types/raw-orders';
import { requestFromApi } from '../../utils/api';
import { AppDispatch } from '../store';

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const fetchOrdersRequest = (): { type: typeof FETCH_ORDERS_REQUEST } => ({
  type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders: RawOrders): { type: typeof FETCH_ORDERS_SUCCESS; payload: RawOrders } => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error: string): { type: typeof FETCH_ORDERS_FAILURE; payload: string } => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error
});

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

export type FetchOrdersRequestAction = ReturnType<typeof fetchOrdersRequest>;
export type FetchOrdersSuccessAction = ReturnType<typeof fetchOrdersSuccess>;
export type FetchOrdersFailureAction = ReturnType<typeof fetchOrdersFailure>;

export type AppActions =
  | FetchOrdersRequestAction
  | FetchOrdersSuccessAction
  | FetchOrdersFailureAction


import  { Orders } from '../../utils/types/orders';

import {requestFromApi} from '../../utils/api.js'
import {setCurrentIngredient} from './current-ingredient-actions.js'

import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState, AppDispatch } from '../store.js';

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

export const fetchOrdersRequest = (): Action => ({
  type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders: Orders): { type: typeof FETCH_ORDERS_SUCCESS, payload: Orders } => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = (error: string): { type: typeof FETCH_ORDERS_FAILURE, payload: string } => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error
});

// export const fetchDataOrders = (number: number): ThunkAction<void, RootState, unknown, Action<string>> => {
//   return (dispatch) => {
//     dispatch(fetchOrdersRequest());

//     requestFromApi(`/orders/${number}`)
//       .then(json => dispatch(fetchOrdersSuccess(json.data)))
//       .catch(error => dispatch(fetchOrdersFailure(error.toString())));
//   };
// };

export const fetchDataOrdersAndSetCurrent = (number: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchOrdersRequest());

    try {
      const json = await requestFromApi(`/orders/${number}`);
      const fetchedOrders = json.orders;

      if (fetchedOrders) {  
        dispatch(fetchOrdersSuccess(fetchedOrders)); 
      } else {
        console.error("No order with number ", number);
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
      dispatch(fetchOrdersFailure("Что-то точно не так"));
    }
  };
};




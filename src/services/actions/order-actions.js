export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

import { fetchWithAuth } from '../../utils/api';

export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
export const createOrderSuccess = (orderNumber) => ({ type: CREATE_ORDER_SUCCESS, payload: orderNumber });
export const createOrderFailure = (error) => ({ type: CREATE_ORDER_FAILURE, payload: error });

export const createOrder = (ingredients) => {
  return async (dispatch) => {
    dispatch(createOrderRequest());

    try {
      const response = await fetchWithAuth('/orders', {
        method: 'POST',
        body: JSON.stringify({ ingredients }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (json.success) {
        dispatch(createOrderSuccess(json.order.number));
      } else {
        dispatch(createOrderFailure('Извините, что-то пошло не так'));
      }
    } catch (error) {
      dispatch(createOrderFailure(error.message));
    }
  };
};

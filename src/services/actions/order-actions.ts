export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
import { Ingredients } from '../../utils/types/ingredients';


import { fetchWithAuth } from '../../utils/api';


export interface CreateOrderRequestProps {
  type: typeof CREATE_ORDER_REQUEST
};

export interface CreateOrderSuccessProps {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: number; 
}

export interface CreateOrderFailureProps {
  type: typeof CREATE_ORDER_FAILURE;
  payload: string; 
}


export const createOrderRequest = () : CreateOrderRequestProps => ({ type: CREATE_ORDER_REQUEST });
export const createOrderSuccess = (orderNumber : CreateOrderSuccessProps) => ({ type: CREATE_ORDER_SUCCESS, payload: orderNumber });
export const createOrderFailure = (error: string): CreateOrderFailureProps => ({ type: CREATE_ORDER_FAILURE, payload: error });

export const createOrder = (ingredients: Ingredients) => {
  return async (dispatch: any) => {  
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
      dispatch(createOrderFailure('Извините, кто-то точно ошибся'));
    }
  };
};

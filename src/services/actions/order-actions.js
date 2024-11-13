export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

import {BASE_URL} from '../../utils/api.js'

export const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
export const createOrderSuccess = (orderData) => ({ type: CREATE_ORDER_SUCCESS, payload: orderData });
export const createOrderFailure = (error) => ({ type: CREATE_ORDER_FAILURE, payload: error });


export const createOrder = (ingredients) => {
    return (dispatch) => {
        dispatch(createOrderRequest());

        fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({ ingredients}), 
            headers: {
                'Content-Type': 'application/json',
            },
        })

        .then(response => response.json())
        .then((json) => {
            if (json.success) {
                dispatch(createOrderSuccess(json.order.number));
            } else {
                dispatch(createOrderFailure('Извините, что-то пошло не так'));
            }
        })
        .catch((error) => {
            dispatch(createOrderFailure(error.message));
        });
    };
};

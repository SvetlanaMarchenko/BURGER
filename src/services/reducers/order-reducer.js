import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILURE,
} from '../actions/order-actions';

const initialState = {
    isLoading: true,
    orderId: null,
    errorInOrder: false
  }

const orderReducer = (state = initialState, action) =>  {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: 
            return {...state, isLoading: false, errorInOrder: false }
        case CREATE_ORDER_SUCCESS: 
            return {...state, isLoading: false, orderId: action.payload}
        case CREATE_ORDER_FAILURE: 
          return {...state, isLoading: false, error: action.payload}
        default:
            return state;
    }
}

export default orderReducer


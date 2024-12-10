import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAILURE,
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure
} from '../actions/order-actions';

interface OrderReducerProps{
  orderId: number | null;
  isLoading: boolean;
  errorInOrder: boolean | null;
}
const initialState:OrderReducerProps = {
    isLoading: true,
    orderId: null,
    errorInOrder: false
  }

type OrderActionTypes =
| createOrderRequest
| createOrderSuccess
| createOrderFailure;

const orderReducer = (
    state = initialState,
    action: OrderActionTypes
  ): OrderReducerProps => {
    switch (action.type) {
      case CREATE_ORDER_REQUEST:
        return { ...state, isLoading: true, errorInOrder: false };
      case CREATE_ORDER_SUCCESS:
        return { ...state, isLoading: false, orderId: action.payload };
      case CREATE_ORDER_FAILURE:
        return { ...state, isLoading: false, errorInOrder: true };
      default:
        return state;
    }
  };
  
  export default orderReducer;


import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from '../actions/order-actions';
import  orderReducer  from './order-reducer';
import  {initialState} from './order-reducer';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle CREATE_ORDER_REQUEST case', () => {
    const action = {
      type: CREATE_ORDER_REQUEST,
    };
    
    const expectedState = {
      ...initialState,
      isLoading: true, 
      errorInOrder: false 
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_SUCCESS case', () => {
    const mockOrders = {
        _id: "678d702b133acd001be4b65a",
        ingredients: [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa094a",
        ],
        owner: "673f0f89b27b06001c3e988c",
        status: "done",
        name: "Краторный астероидный бургер",
        createdAt: "2025-01-19T21:35:39.011Z",
        updatedAt: "2025-01-19T21:35:39.639Z",
        number: 66105,
        __v: 0
    }
    const action = {
      type: CREATE_ORDER_SUCCESS,
      payload: mockOrders,
    };
    
    const expectedState = {
      orderId: mockOrders,
      isLoading: false,
      errorInOrder: false
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });



    it('should handle CREATE_ORDER_FAILURE case', () => {

        const action = {
            type: CREATE_ORDER_FAILURE,
          };
        const expectedState = {
            ...initialState,
            isLoading: false,
            errorInOrder: true, 

        }

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });



});



import { FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE } from '../actions/current-order-actions';
import { ordersReducer } from './current-order-reducer'; // Import the reducer directly

describe('ordersReducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null,
  };

  it('should return the initial state when passed an undefined state and an unknown action', () => {
    // Testing with undefined state and an unrecognized action type
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle FETCH_ORDERS_REQUEST case', () => {
    const action = {
      type: FETCH_ORDERS_REQUEST,
    };
    
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_ORDERS_REQUEST case', () => {
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
      type: FETCH_ORDERS_SUCCESS,
      payload: mockOrders,
    };
    
    const expectedState = {
      orders: mockOrders,
      loading: false,
      error: null,
    };

    expect(ordersReducer(initialState, action)).toEqual(expectedState);
  });


});




//   it('should handle FETCH_ORDERS_SUCCESS action', () => {
//     const mockOrders = [
//       { id: 1, name: 'Order 1' },
//       { id: 2, name: 'Order 2' },
//     ];

//     const action = {
//       type: FETCH_ORDERS_SUCCESS,
//       payload: mockOrders,
//     };

//     const expectedState = {
//       orders: mockOrders,
//       loading: false,
//       error: null,
//     };

//     expect(ordersReducer(initialState, action)).toEqual(expectedState);
//   });

//   it('should handle FETCH_ORDERS_FAILURE action', () => {
//     const errorMessage = 'Error fetching orders';

//     const action = {
//       type: FETCH_ORDERS_FAILURE,
//       payload: errorMessage,
//     };

//     const expectedState = {
//       ...initialState,
//       loading: false,
//       error: errorMessage,
//     };

//     expect(ordersReducer(initialState, action)).toEqual(expectedState);
//   });


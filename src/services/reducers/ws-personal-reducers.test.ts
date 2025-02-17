import { WS_PERS_CONNECTION_ERROR, WS_PERS_CONNECTION_SUCCESS } from '../actions/ws-personal-action-types';
import { wsPersonalReducer } from './ws-personal-reducers';

describe('wsPersonalReducer', () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  };

  it('should return the initial state', () => {
    expect(wsPersonalReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle WS_PERS_CONNECTION_SUCCESS case', () => {
    const action = {
      type: WS_PERS_CONNECTION_SUCCESS,
    };
    
    const expectedState = {
      ...initialState,
      error: undefined, 
        wsConnected: true,
    };
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_PERS_CONNECTION_ERROR case', () => {
    const error = new Event('error');

    const action = {
        type: WS_PERS_CONNECTION_ERROR,
        payload: error,
        
      };
    const expectedState = {
        ...initialState,
        error: error, 
        wsConnected: false,
    }
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
    });


//   it('should handle CREATE_ORDER_SUCCESS case', () => {
//     const mockOrders = {
//         _id: "678d702b133acd001be4b65a",
//         ingredients: [
//         "643d69a5c3f7b9001cfa093c",
//         "643d69a5c3f7b9001cfa094a",
//         ],
//         owner: "673f0f89b27b06001c3e988c",
//         status: "done",
//         name: "Краторный астероидный бургер",
//         createdAt: "2025-01-19T21:35:39.011Z",
//         updatedAt: "2025-01-19T21:35:39.639Z",
//         number: 66105,
//         __v: 0
//     }
//     const action = {
//       type: CREATE_ORDER_SUCCESS,
//       payload: mockOrders,
//     };
    
//     const expectedState = {
//       orderId: mockOrders,
//       isLoading: false,
//       errorInOrder: false
//     };

//     expect(orderReducer(initialState, action)).toEqual(expectedState);
//   });








});



import { ADD_INGREDIENT } from "../actions/constructor-actions";
import constructorReducer from "./сonstructor-reducer";

describe('constructorReducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const ingredient1 = { id: 1, name: 'Cucumber' };
  const ingredient2 = { id: 2, name: 'Tomato' };
  const ingredient3 = { id: 3, name: 'meat' }

  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT case', () => {


    const action = {
      type: ADD_INGREDIENT,
      payload: ingredient1
    }
    
    const expectedState = {
        bun: null,
        ingredients: [ingredient1]
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });


//   it('should handle WS_CONNECTION_ERROR case', () => {
//     const error = new Event('error');

//     const action = {
//         type: WS_CONNECTION_ERROR,
//         payload: error,
        
//       };
//     const expectedState = {
//         ...initialState,
//         error: error, 
//         wsConnected: false,
//     }
//     expect(wsReducer(initialState, action)).toEqual(expectedState);
//     });

// it('should handle WS_CONNECTION_CLOSED case', () => {

//     const action = {
//         type: WS_CONNECTION_CLOSED,
        
//         };
//     const expectedState = {
//         ...initialState,
//         error: undefined,
//         wsConnected: false,
//     }
//     expect(wsReducer(initialState, action)).toEqual(expectedState);
//     });

// it('should handle WS_CONNECTION_CLOSE case', () => {

//     const action = {
//         type: WS_CONNECTION_CLOSE,
        
//         };
//     const expectedState = {
//         ...initialState,
//         error: undefined,
//         wsConnected: false,
//     }
//     expect(wsReducer(initialState, action)).toEqual(expectedState);
//     });

//     it('should handle WS_GET_MESSAGE', () => {
//         const action = {
//           type: WS_GET_MESSAGE,
//           payload: {
//             orders: [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }],
//             total: 100,
//             totalToday: 50,
//           },
//         };
//         const expectedState = {
//           ...initialState,
//           orders: action.payload.orders,
//           total: action.payload.total,
//           totalToday: action.payload.totalToday,
//           error: undefined
//         };
//         expect(wsReducer(initialState, action)).toEqual(expectedState);
//       });

//       it('should handle WS_CLEAR_ORDERS', () => {
//         const action = {
//           type: WS_CLEAR_ORDERS,
//         };
//         const expectedState = {
//           ...initialState,
//           wsConnected: false
//         };
//         expect(wsReducer(initialState, action)).toEqual(expectedState);
//       });
});



import { ADD_INGREDIENT, REMOVE_BUN, REMOVE_INGREDIENT, SET_BUN } from "../actions/constructor-actions";
import constructorReducer from "./сonstructor-reducer";

describe('constructorReducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const ingredient1 = { id: 1, name: 'Cucumber' };
  const ingredient2 = { id: 2, name: 'Tomato' };
  const ingredient3 = { id: 3, name: 'meat' }
  const bun1 = { id: 4, name: 'bulka' }
  const bun2 = { id: 5, name: 'hlebushek' }


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


  it('should handle REMOVE_INGREDIENT case', () => {
    const state = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
  
    const action = {
      type: REMOVE_INGREDIENT,
      payload: 0
    };
  
    const expectedState = {
      bun: null,
      ingredients: [ingredient2] 
    };
  
    expect(constructorReducer(state, action)).toEqual(expectedState);
  });
  
  it('should handle SET_BUN case', () => {


    const action = {
      type: SET_BUN,
      payload: bun1
    }
    
    const expectedState = {
        bun: bun1,
        ingredients: []
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REMOVE_BUN case', () => {
    const state = {
      bun: bun1,
      ingredients: []
    };
  
    const action = {
      type: REMOVE_BUN,
    };
  
    const expectedState = {
      bun: null,
      ingredients: [] 
    };
  
    expect(constructorReducer(state, action)).toEqual(expectedState);
  });

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



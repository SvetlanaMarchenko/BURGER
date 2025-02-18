import { ADD_INGREDIENT, CLEAR_CONSTRUCTOR, REMOVE_BUN, REMOVE_INGREDIENT, REPLACE_INGREDIENT, SET_BUN } from "../actions/constructor-actions";
import constructorReducer from "./сonstructor-reducer";

describe('constructorReducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const ingredient_1 = { id: 1, name: 'Cucumber' };
  const ingredient_2 = { id: 2, name: 'Tomato' };
  const ingredient_3 = { id: 3, name: 'meat' }
  const bun1 = { id: 4, name: 'bulka' }


  it('should return the initial state', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT case', () => {


    const action = {
      type: ADD_INGREDIENT,
      payload: ingredient_1
    }
    
    const expectedState = {
        bun: null,
        ingredients: [ingredient_1]
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });


  it('should handle REMOVE_INGREDIENT case', () => {
    const state = {
      bun: null,
      ingredients: [ingredient_1, ingredient_2]
    };
  
    const action = {
      type: REMOVE_INGREDIENT,
      payload: 0
    };
  
    const expectedState = {
      bun: null,
      ingredients: [ingredient_2] 
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

  it('should handle CLEAR_CONSTRUCTOR', () => {
    const action = {
      type: CLEAR_CONSTRUCTOR,
    };
    const expectedState = {
      ...initialState,
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle REPLACE_INGREDIENT when moving forward by one spot', () => {
    const state = {
      bun: null,
      ingredients: [ingredient_1, ingredient_2, ingredient_3]
    };
  
    const action = {
      type: REPLACE_INGREDIENT,
      fromIndex: 0,  
      toIndex: 1    
    };
  
    const expectedState = {
      bun: null,
      ingredients: [ingredient_2, ingredient_1, ingredient_3] 
    };
  
    expect(constructorReducer(state, action)).toEqual(expectedState);
  });
  
  
});







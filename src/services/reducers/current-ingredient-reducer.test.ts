import { SET_CURRENT_INGREDIENT } from '../actions/current-ingredient-actions';

describe('currentIngredientsReducer', () => {
  
  // Test 1: Initial state
  it('should return the initial state (null)', async () => {
    const { default: currentIngredientsReducer } = await import('./current-ingredient-reducer');
    
    expect(currentIngredientsReducer(undefined, { type: '' })).toBeNull();
  });

  // Test 2: SET_CURRENT_INGREDIENT case
  it('should handle SET_CURRENT_INGREDIENT case', async () => {
    const { default: currentIngredientsReducer } = await import('./current-ingredient-reducer');
    
    const mockIngredient = {
      _id: "643d69a5c3f7b9001cfa093c",
      id: "2",
      key: "2",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    };

    const action = {
      type: SET_CURRENT_INGREDIENT,
      payload: mockIngredient,
    };

    expect(currentIngredientsReducer(null, action)).toEqual(mockIngredient);
  });
});

describe('currentIngredientsReducer', () => {
    it('should return the initial state', async () => {
      const { default: currentIngredientsReducer } = await import('./current-ingredient-reducer');
      
      // Test the initial state, which should be `null`
      expect(currentIngredientsReducer(undefined, {
          type: ''
      })).toBeNull();
    });
  });
  
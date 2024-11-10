import { 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    SET_BUN,
    REMOVE_BUN,
    CLEAR_CONSTRUCTOR, 
    REPLACE_INGREDIENT
} from '../actions/constructor-actions';

const initialState = {
    bun: null,
    ingredients: [] 
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            };

        case REMOVE_INGREDIENT:
            console.log('Удаляем ингредиент с index:', action.payload); 
            
            return {
                ...state,
                ingredients: state.ingredients.filter((item, index) => index !== action.payload)
            };

        case SET_BUN:
            return {
                ...state, 
                bun: action.payload
            };

        case REMOVE_BUN:
            return {
                ...state,
                bun: null
            };

        case CLEAR_CONSTRUCTOR:
            return initialState;

        case REPLACE_INGREDIENT:
            const { fromIndex, toIndex } = action;
            const newIngredients = [...state.ingredients];
            
            console.log('Before removal:', [...newIngredients]);
            const [movedIngredient] = newIngredients.splice(fromIndex, 1);
            console.log('After removal:', [...newIngredients]);
            
            const isMovingForward = fromIndex < toIndex;
            const isMovingMoreThanOneSpot = toIndex - fromIndex > 1;
            const needToAdjustIndex = isMovingForward && isMovingMoreThanOneSpot;
            
            const adjustedToIndex = needToAdjustIndex 
                ? toIndex - 1 
                : toIndex;
            
            newIngredients.splice(adjustedToIndex, 0, movedIngredient);
            console.log('After insertion:', newIngredients);
            
            return {
                ...state,
                ingredients: newIngredients
            };

        default:
            return state;
    }
};

export default constructorReducer;

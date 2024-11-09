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
            console.log('Удаляем ингредиент с ID:', action.payload); // Логируем ID
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item._id !== action.payload)
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
            const { ingredientElementInder, ingredientHoverIndex } = action;
            const ingredients = [...state.ingredients];
            const movedIngredient = ingredients[ingredientElementInder];

            ingredients.splice(ingredientElementInder, 1); 
            ingredients.splice(ingredientHoverIndex, 0, movedIngredient);  

            return {
                ...state,
                ingredients
            };

        default:
            return state;
    }
};

export default constructorReducer;

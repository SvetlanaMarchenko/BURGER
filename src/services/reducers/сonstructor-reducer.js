import { 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    SET_BUN,
    REMOVE_BUN,
    CLEAR_CONSTRUCTOR, } from '../actions/constructor-actions';

const initialState = {
    bun: null,
    ingredients: [] 
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            return{
            ...state, ingredients: [...state.ingredients, action.payload]}
        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item._id !== action.payload)
            };
        case SET_BUN:
            return {...state, bun: action.payload };
        case REMOVE_BUN:
            return {...state,bun: null};

        case CLEAR_CONSTRUCTOR:
            return initialState;

        default:
            return state;
    }
};

export default constructorReducer;

// constructorReducer.js
import { ADD_INGREDIENT, REMOVE_INGREDIENT, CLEAR_CONSTRUCTOR } from '../actions/constructor-actions';

const initialState = {
    bun: null, // Здесь хранится одна булка
    ingredients: [] // Здесь хранятся начинки и соусы
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.payload.type === 'bun') {
                // Заменяем булку
                return { ...state, bun: action.payload };
            } else {
                // Добавляем соус или начинку
                return { ...state, ingredients: [...state.ingredients, action.payload] };
            }

        case REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item._id !== action.payload)
            };

        case CLEAR_CONSTRUCTOR:
            return initialState;

        default:
            return state;
    }
};

export default constructorReducer;


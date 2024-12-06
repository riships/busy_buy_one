import {
    SET_PRODUCTS,
    SET_ERROR,
    TOGGLE_LOADING,
    SET_FILTERED_PRODUCTS,
    SET_CART_PRODUCTS,
} from "./types";


const ProductsReducer = (state, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                loading: false,
                error: false,
                products: action.payload
            };
        case SET_FILTERED_PRODUCTS:
            return {
                ...state,
                filteredProducts: action.payload
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        case SET_CART_PRODUCTS:
            return {
                ...state,
                cartProducts: action.payload,
            };
        default:
            return state;
    }
}

export default ProductsReducer;
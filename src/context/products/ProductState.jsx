import { useReducer } from "react";
import {
    SET_PRODUCTS,
    SET_ERROR,
    TOGGLE_LOADING,
    SET_FILTERED_PRODUCTS,
} from "./types";
import ProductsReducer from "./ProductReducer";
import { collection, getDocs, query } from "firebase/firestore";
import ProductContext from "./ProductContext";
import { db } from "../../config/fireBaseInit";


const ProductState = ({ children }) => {
    const initalState = {
        loading: false,
        products: [],
        filteredProducts: [],
        cartProducts: [],
        error: ''
    }

    const [state, dispatch] = useReducer(ProductsReducer, initalState);

    const getAllProducts = async () => {
        try {
            dispatch({ type: TOGGLE_LOADING });
            const productRef = collection(db, 'products');
            const productsSnapshot = await getDocs(query(productRef));
            const productsData = productsSnapshot.docs.map((doc) => ({
                ...doc.data(),
            }))
            dispatch({ type: SET_PRODUCTS, payload: productsData })
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: error.message });
        }
    }

    // Function to filter and search products
    const filterProducts = async (filterObj) => {
        const {
            searchQuery,
            priceRange,
            categories: { mensFashion, womensFashion, jewelery, electronics },
        } = filterObj

        let filteredProductsNew = [...state.products];

        if (priceRange) {
            filteredProductsNew = filteredProductsNew.filter((product) => {
                return product.price * 100 < priceRange
            });
        }

        if (searchQuery) {
            filteredProductsNew = filteredProductsNew.filter((product) => {
                return product.title.toLowerCase().includes(searchQuery.toLowerCase());
            })
        }

        if (mensFashion || womensFashion || jewelery || electronics) {
            filteredProductsNew = filteredProductsNew.filter((product) => {
                if (mensFashion && product.category === 'men\'s clothing') {
                    return true;
                }
                if (womensFashion && product.category === 'women\'s clothing') {
                    return true;
                }
                if (electronics && product.category === 'electronics') {
                    return true;
                }
                if (jewelery && product.category === 'jewelery') {
                    return true;
                }
                return false;
            });
        }

        dispatch({ type: SET_FILTERED_PRODUCTS, payload: filteredProductsNew });
    }
    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                filteredProducts: state.filteredProducts,
                loading: state.loading,
                getAllProducts,
                filterProducts,
            }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductState;
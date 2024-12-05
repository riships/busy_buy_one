import React, { useContext } from 'react'
import ProductContext from '../../context/products/ProductContext'

function ProductList() {
    const {
        products,
        filteredProducts,
        cartProducts,
        error,
        loading
    } = useContext(ProductContext);

    return (
        <>
            List
        </>
    )
}

export default ProductList
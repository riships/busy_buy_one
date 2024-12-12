import React from 'react'
import { Button } from 'react-bootstrap';

function AddToCartButton({ onCart, handleAddPRoductToCart, addingProductToCart, removeProductFromCart }) {

    return (
        <>
            {onCart ? <Button variant='danger' onClick={removeProductFromCart}>{addingProductToCart ? 'Removing...' : "Remove From Cart"}</Button> : <Button onClick={handleAddPRoductToCart}>{addingProductToCart ? 'Adding...' : "Add To Cart"}</Button>}
        </>
    )
}

export default AddToCartButton;
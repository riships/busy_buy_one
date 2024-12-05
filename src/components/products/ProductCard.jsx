import React from 'react'
import style from '../../styles/product.module.css'
import { Button } from 'react-bootstrap'

function ProductCard() {
    return (
        <>
            <div className={style.productCard}>
                <div>
                    <img src='' alt='' />
                </div>
                <div></div>
                <Button>Add To Cart</Button>
            </div>
        </>
    )
}

export default ProductCard
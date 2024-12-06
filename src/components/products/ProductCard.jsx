import React from 'react'
import style from '../../styles/product.module.css'
import { Button } from 'react-bootstrap'

function ProductCard({ product }) {
    const { title, price, image, id, category } = product

    return (
        <>
            <div key={id} className={style.productCard} >
                <div className={style.img_div}>
                    <img src={image} alt={category} height="100%" width="100%" />
                </div>
                <div className={style.details_div}>
                    <p>{title}</p>
                    <p>{price * 100}</p>
                    <Button onClick={() => { }}>Add To Cart</Button>
                </div>
            </div>
        </>
    )
}

export default ProductCard
import React from 'react'
import style from '../../styles/product.module.css'
import AddToCartButton from './AddToCartButton';

function ProductCard({ product }) {
    const { title, price, image, id, category } = product;

    return (
        <>
            <div key={id} className={style.productCard} >
                <div className={style.img_div}>
                    <img src={image} alt={category} height="100%" width="100%" />
                </div>
                <div className={style.details_div}>
                    <p>{title.slice(0, 250)}</p>
                    <p style={{ fontWeight: '700' }} className='fs-6'>₹ {price * 100}</p>
                    <AddToCartButton />
                </div>
            </div>
        </>
    )
}

export default ProductCard
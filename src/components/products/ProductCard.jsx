import React from 'react'
import style from '../../styles/product.module.css'
import AddToCartButton from './AddToCartButton';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

function ProductCard({ product, onCart, cartProductsMap }) {
    const { title, price, image, id, category } = product;

    return (
        <>
            <div key={id} className={style.productCard} >
                <div className={style.img_div}>
                    <img src={image} alt={category} height="100%" width="100%" />
                </div>
                <div className={style.details_div}>
                    <p>{title.slice(0, 250)}</p>
                    <div className='d-flex justify-content-between mb-2 fs-5'>
                        <p style={{ fontWeight: '700' }} className='mb-0'>₹ {price * 100}</p>
                        {onCart &&
                            <div className='d-flex justify-content-between gap-2 align-items-center'>
                                <span><FaMinusCircle /></span>
                                <span>{cartProductsMap[product.id]}</span>
                                <span><FaPlusCircle /></span>
                            </div>
                        }
                    </div>
                    <AddToCartButton onCart={onCart} productId={id} />
                </div>
            </div>
        </>
    )
}

export default ProductCard
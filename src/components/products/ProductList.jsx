import React from 'react';
import ProductCard from './ProductCard';
import style from '../../styles/product.module.css'
import { Container } from 'react-bootstrap';

function ProductList({ products, onCart, cartProductsMap, updateProductQuantity, filterProductFromState }) {
    return (
        <>
            <Container className='my-4'>
                <div className={style.productList}>
                    {products.map((product) => (
                        <ProductCard
                            onCart={onCart}
                            key={product.id}
                            product={product}
                            cartProductsMap={cartProductsMap}
                            updateProductQuantity={updateProductQuantity}
                            filterProductFromState={filterProductFromState}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default ProductList;

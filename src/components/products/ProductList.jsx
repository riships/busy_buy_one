import React from 'react';
import ProductCard from './ProductCard';
import style from '../../styles/product.module.css'
import { Container } from 'react-bootstrap';

function ProductList({ products }) {
    console.log(products);

    return (
        <>
            <Container className='my-4'>
                <div className={style.productList}>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default ProductList;

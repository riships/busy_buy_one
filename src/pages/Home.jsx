import React, { useContext, useEffect, useState } from 'react'
import ProductList from '../components/products/ProductList';
import ProductContext from '../context/products/ProductContext';
import { Spinner } from 'react-bootstrap';
import Filter from '../components/Filter';


function Home() {
    const [query, setQuery] = useState('');
    const [priceRange, setPriceRange] = useState(75999);
    const [categories, setCategories] = useState({
        mensFashion: false,
        electronics: false,
        jewelery: false,
        womensClothing: true,
    });

    const {
        products,
        filteredProducts,
        error,
        loading,
        getAllProducts,
        filterProducts
    } = useContext(ProductContext);


    useEffect(() => {
        getAllProducts();
    }, []);


    useEffect(() => {
        filterProducts({ priceRange, categories, searchQuery: query })
    }, [priceRange, query, categories])

    if (loading) {
        return <div className='text-center m-4'><Spinner /></div>
    }

    return (
        <>
            <div>
                <div>
                    <Filter
                        setPriceRange={setPriceRange}
                        setCategories={setCategories}
                        priceRange={priceRange} />
                </div>
                <ProductList products={products.length > 0 ? products : filteredProducts} />
            </div>
        </>
    )
}

export default Home;
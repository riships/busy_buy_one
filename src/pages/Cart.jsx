import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import { getProductsUsingProductIds, getUserCartProducts } from '../utils/utils';
import { toast } from 'react-toastify';
import ProductCard from '../components/products/ProductCard';
import { Spinner } from 'react-bootstrap';
import ProductList from '../components/products/ProductList';

function Cart() {
    const { user } = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartProductsMap, setCartProductsMap] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getCartProducts(user?.uid);
    }, [])

    // get product here from cart
    const getCartProducts = async (uid) => {
        setLoading(true)
        try {
            let { data } = await getUserCartProducts(uid)
            const { myCart: cart } = data;
            setCartProductsMap(cart);

            const productsData = await getProductsUsingProductIds(cart);
            if (!productsData) {
                return toast.error("No products in Cart!");
            }
            setCartProducts(productsData);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div>
                {loading ? <div className='text-center my-4'><Spinner /></div> :
                    <ProductList
                        products={cartProducts}
                    />
                }
            </div>
        </>
    )
}

export default Cart
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import { getProductsUsingProductIds, getUserCartProducts } from '../utils/utils';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import ProductList from '../components/products/ProductList';

function Cart() {
    const { user } = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartProductsMap, setCartProductsMap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [onCart, setOnCart] = useState(false)

    let totalAmount = 0;
    cartProducts.map((product) => totalAmount += (product.price * 100) * cartProductsMap[product.id])
    useEffect(() => {
        setOnCart(true)
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
                    <>
                        <aside className='filter_container'>
                            <h2>TotalPrice: {totalAmount}</h2>

                        </aside>
                        <ProductList
                            onCart={onCart}
                            cartProductsMap={cartProductsMap}
                            products={cartProducts}
                        />
                    </>
                }
            </div>
        </>
    )
}

export default Cart
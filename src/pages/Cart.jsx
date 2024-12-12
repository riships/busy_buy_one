import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/Auth/AuthContext'
import { getProductsUsingProductIds, getUserCartProducts } from '../utils/utils';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Spinner } from 'react-bootstrap';
import ProductList from '../components/products/ProductList';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/fireBaseInit';
import { useNavigate } from 'react-router';

function Cart() {
    const { user } = useContext(AuthContext);
    const [cartProducts, setCartProducts] = useState([]);
    const [cartProductsMap, setCartProductsMap] = useState([]);
    const [loading, setLoading] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [onCart, setOnCart] = useState(false);

    const navigate = useNavigate()

    let totalPrice = cartProducts.reduce((acc, currentProduct) => {
        return acc + (currentProduct.price * 100) * currentProduct.quantity;
    }, 0);

    useEffect(() => {
        setOnCart(true)
        getCartProducts(user?.uid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            toast.error("Something went wrong!");
        } finally {
            setLoading(false)
        }
    }
    const filterProductFromState = (productId) => {
        delete cartProductsMap[productId];
        setCartProducts((prevProds) => {
            return prevProds.filter((product) => {
                return product.id !== productId;
            })
        })
    }

    const updateProductQuantity = (type, id) => {
        let tempCart = cartProducts.map((product) => {
            if (product.id === id) {
                product.quantity += type === "add" ? 1 : -1;
            }
            return product;
        });
        cartProductsMap[id] += type === "add" ? 1 : -1;
        setCartProducts(tempCart);
    };

    const handlePurchase = async () => {
        setPurchasing(true)
        try {
            const docRef = doc(db, 'userOrders', user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (data) {
                updateDoc(docRef, {
                    orders: arrayUnion({ ...cartProductsMap, date: Date.now() }),
                });

                // Redirect the user to orders page after successful purchase
                clearUserCartAndRedirectToOrdersPage();
                return;
            }

            // Create a new orders array if no orders yet
            await setDoc(docRef, {
                orders: [{ ...cartProductsMap, date: Date.now() }],
            });

            // Redirect the user to orders page after successful purchase
            clearUserCartAndRedirectToOrdersPage();
        } catch (error) {
            console.log(error);
        } finally {
            setPurchasing(false)
        }
    }

    // Clear user cart
    const clearUserCartAndRedirectToOrdersPage = async () => {
        const userCartRef = doc(db, "userCart", user.uid);

        updateDoc(userCartRef, {
            myCart: {},
        });

        setCartProducts([]);
        setCartProductsMap({});

        navigate("/myOrders");
    };



    return (
        <>
            <ToastContainer />
            <div>
                {loading ? (
                    <div className="text-center my-4">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        {cartProducts.length > 0 ? (
                            // Content to display when `cartProducts` has items
                            <>
                                <aside className="filter_container">
                                    <h2>TotalPrice: {totalPrice}</h2>
                                    <Button onClick={handlePurchase} type='button' className='my-2'>{purchasing ? 'Purchasing' : 'Purchase'}</Button>
                                </aside>
                                <ProductList
                                    onCart={onCart}
                                    cartProductsMap={cartProductsMap}
                                    products={cartProducts}
                                    updateProductQuantity={updateProductQuantity}
                                    filterProductFromState={filterProductFromState}
                                />
                            </>
                        ) : (
                            // Content to display when `cartProducts` is empty
                            <>
                                <h1 className='text-center fw-bold my-5'>Cart is Empty!</h1>
                            </>
                        )}
                    </>
                )}
            </div>
        </>

    )
}

export default Cart
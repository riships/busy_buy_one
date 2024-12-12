import React, { useContext, useState } from 'react'
import style from '../../styles/product.module.css'
import AddToCartButton from './AddToCartButton';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getUserCartProducts } from '../../utils/utils';
import AuthContext from '../../context/Auth/AuthContext';

function ProductCard({ product, onCart, cartProductsMap, updateProductQuantity, filterProductFromState }) {
    const { title, price, image, id, category } = product;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [addingProductToCart, setProductAddingToCart] = useState(false);


    const handleAddPRoductToCart = async () => {
        setProductAddingToCart(true);
        if (!user) {
            return navigate('/signin')
        }
        try {
            const { data, docRef } = await getUserCartProducts(user.uid);
            if (data && data.myCart[id]) {
                const { myCart: cart } = data;
                const currentProductCount = cart[id];
                const updatedCart = {
                    ...cart,
                    [id]: currentProductCount + 1,
                };
                updateDoc(docRef, {
                    myCart: updatedCart,
                });
                return toast.success("Increase product count!");
            }
            // Create a new cart if it does not exist
            const cart = data?.myCart || {};
            await setDoc(docRef, {
                myCart: { ...cart, [id]: 1 },
            });

            toast.success("Product Added Successfully!");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setProductAddingToCart(false)
        }
    }

    // Remove product from the database
    const removeProductFromCart = async () => {
        try {
            const { data, docRef } = await getUserCartProducts(user.uid);

            const { myCart: cart } = data;

            if (!cart[id]) {
                return toast.error("Product not in cart!");
            }

            delete cart[id];

            await updateDoc(docRef, {
                myCart: {
                    ...cart,
                },
            });

            filterProductFromState(id);

            toast.success("Product Removed Successfully!");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };


    // Handling the product quantity increase
    const handleAdd = async () => {
        try {
            const { data, docRef } = await getUserCartProducts(user.uid);

            const { myCart: cart } = data;
            if (cart && cart[id]) {
                const currentProductCount = cart[id];
                const updatedCart = {
                    ...cart,
                    [id]: currentProductCount + 1,
                };

                await updateDoc(docRef, {
                    myCart: updatedCart,
                });

                updateProductQuantity("add", id);

                return;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleremove = async () => {
        try {
            const { data, docRef } = await getUserCartProducts(user.uid);

            const { myCart: cart } = data;


            if (cart && cart[id]) {
                const productCountAfterRemove = cart[id] - 1;
                const updatedCart = {
                    ...cart,
                    [id]: productCountAfterRemove,
                };
                if (productCountAfterRemove === 0) delete updatedCart[id]

                await updateDoc(docRef, {
                    myCart: updatedCart,
                });

                if (productCountAfterRemove === 0)
                    return filterProductFromState(id);

                updateProductQuantity("remove", id);
                return;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

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
                                <span onClick={handleremove}><FaMinusCircle /></span>
                                <span>{cartProductsMap[product.id]}</span>
                                <span onClick={handleAdd}><FaPlusCircle /></span>
                            </div>
                        }
                    </div>
                    <AddToCartButton
                        onCart={onCart}
                        addingProductToCart={addingProductToCart}
                        handleAddPRoductToCart={handleAddPRoductToCart}
                        removeProductFromCart={removeProductFromCart}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductCard
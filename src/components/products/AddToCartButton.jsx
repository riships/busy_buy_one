import React, { useContext, useState } from 'react'
import { Button } from 'react-bootstrap';
import AuthContext from '../../context/Auth/AuthContext';
import { useNavigate } from 'react-router';
import { getUserCartProducts } from '../../utils/utils';
import { setDoc, updateDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';

function AddToCartButton({ productId, onCart }) {
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
            if (data && data.myCart[productId]) {
                const { myCart: cart } = data;
                const currentProductCount = cart[productId];
                const updatedCart = {
                    ...cart,
                    [productId]: currentProductCount + 1,
                };
                updateDoc(docRef, {
                    myCart: updatedCart,
                });
                return toast.success("Increase product count!");
            }
            // Create a new cart if it does not exist
            const cart = data?.myCart || {};
            await setDoc(docRef, {
                myCart: { ...cart, [productId]: 1 },
            });

            toast.success("Product Added Successfully!");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setProductAddingToCart(false)
        }
    }

    return (
        <>{onCart ? <Button variant='danger' onClick={handleAddPRoductToCart}>{addingProductToCart ? 'Adding...' : "Remove From Cart"}</Button> : <Button onClick={handleAddPRoductToCart}>{addingProductToCart ? 'Adding...' : "Add To Cart"}</Button>}

        </>
    )
}

export default AddToCartButton;
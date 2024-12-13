import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/fireBaseInit'
import AuthContext from '../context/Auth/AuthContext'
import { Container, Spinner, Table } from 'react-bootstrap';
import { convertDate, getProductsUsingProductIds } from '../utils/utils';

function MyOrders() {
    const { user } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getOurders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getOurders = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, 'userOrders', user.uid);
            const orderSnap = await getDoc(docRef);
            const data = orderSnap.data();
            const { orders } = data;

            const promises = orders.map((elem) => getProductsUsingProductIds(elem));
            const results = await Promise.all(promises);

            const newArr = results;
            setOrderList((prev) => [...prev, ...newArr]);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                loading ? <div className='text-center'><Spinner /></div> : (
                    <>
                        {
                            orderList.length > 0 ? (
                                <>
                                    <Container className='mx-auto'>
                                        <h1 className='text-center my-3 fw-bold'>Your Orders</h1>
                                        <div className='d-flex flex-column align-items-center my-4'>
                                            {orderList.map((orders, index) => {
                                                return (
                                                    <>
                                                        <h2 className='text-center fs-4 fw-lighter text-primary mt-3'>Ordered On:- {convertDate(orders[index]["date"])}</h2>
                                                        <Table key={index} striped bordered style={{ width: '80%' }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Title</th>
                                                                    <th>Price</th>
                                                                    <th>Quantity</th>
                                                                    <th className='text-center'>Total Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {orders.map((order) => {
                                                                    const { title, price, quantity, id } = order;
                                                                    return (
                                                                        <tr key={id}>
                                                                            <td>{title}</td>
                                                                            <td>₹ {price * 100}</td>
                                                                            <td>{quantity}</td>
                                                                            <td className='text-center'>₹ {(price * 100) * quantity}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td colSpan='3'></td>
                                                                    <td className='text-center'>
                                                                        ₹{" "}
                                                                        {orders.reduce(
                                                                            (total, order) => total + order.price * 100 * order.quantity,
                                                                            0
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            </tfoot>
                                                        </Table>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </Container>
                                </>
                            ) : (
                                <>
                                    <h1 className='text-center fw-bold my-5'>You have not ordered anything till now.</h1>
                                </>
                            )
                        }

                    </>

                )}
        </>
    )
}

export default MyOrders
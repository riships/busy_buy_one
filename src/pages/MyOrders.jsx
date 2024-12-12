import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../config/fireBaseInit'
import AuthContext from '../context/Auth/AuthContext'
import { Spinner, Table } from 'react-bootstrap';

function MyOrders() {
    const { user } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getOurders();
    }, [])

    const getOurders = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, 'userOrders', user.uid);
            const orderSnap = await getDoc(docRef);
            const data = orderSnap.data();

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
                                    <Table striped bordered>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderList.map((order) => {
                                                const { title, price, quantity, totalPrice, id } = order;

                                            })}
                                        </tbody>
                                    </Table>
                                </>
                            ) : (
                                <></>
                            )
                        }

                    </>

                )}
        </>
    )
}

export default MyOrders
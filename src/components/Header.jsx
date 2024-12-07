import React, { useContext } from 'react'
import { Link } from 'react-router';
import style from '../styles/header.module.css'
import AuthContext from '../context/Auth/AuthContext';

function Header() {
    const { user, logout, error } = useContext(AuthContext);

    return (
        <>
            <header className={style.header}>
                <nav className={`container ${style.custom_nav}`}>
                    <Link to='/'>Busy Buy</Link>
                    <ul className={style.custom_links}>
                        <li><Link to='/'>Home</Link></li>
                        {user ? (<><li><Link to='/myOrders'>My Orders</Link></li><li><Link to='/cart'>Cart</Link></li><li><Link onClick={logout} to='/'>Logout</Link></li></>) : <li><Link to='/signin'>Sign In</Link></li>}

                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;
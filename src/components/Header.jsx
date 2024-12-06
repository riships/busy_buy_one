import React from 'react'
import { Link } from 'react-router';
import style from '../styles/header.module.css'

function Header() {
    return (
        <>
            <header className={style.header}>
                <nav>
                    <Link to='/'><img src='' alt='logo' /></Link>
                    <div >

                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;
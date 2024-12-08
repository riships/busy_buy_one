// components/SignIn.jsx
import React, { useContext, useEffect, useState } from 'react';
import style from '../styles/authform.module.css';
import { Link } from 'react-router';
import AuthContext from '../context/Auth/AuthContext';
import { useNavigate } from 'react-router';

const SignIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { user, login, error, message } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData
        login(email, password)
    };

    if (error) {
        return <div className='text-center'>{message}</div>
    }

    return (
        <div className={style.auth_container}>
            <form onSubmit={handleSubmit} className={style.auth_form}>
                <h2>Sign In</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{ marginBottom: 0 }}>Sign In</button>
                <div className={style.divider}>
                    <span>OR</span>
                </div>
                <Link to='/signup'>
                    <button>
                        Sign Up
                    </button>
                </Link>
            </form>
        </div>
    );
};

export default SignIn;

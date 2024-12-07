// components/SignUp.jsx
import React, { useContext, useEffect, useState } from 'react';
import style from '../styles/authform.module.css';
import { Link } from 'react-router';
import AuthContext from '../context/Auth/AuthContext';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const SignUp = () => {
    const { signUp, loading, error, message, user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    if (loading) {
        return <div className='text-center m-4'><Spinner /></div>
    }

    if (error) {
        return <p className='text-center'>{message}</p>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signUp(formData)
    };

    return (
        <div className={style.auth_container}>
            <form onSubmit={handleSubmit} className={style.auth_form}>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
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
                {/* {error && <p className='text-danger'>{error}</p>} */}
                <button type="submit" style={{ marginBottom: 0 }}>Sign Up</button>
                <div className={style.divider}>
                    <span>OR</span>
                </div>
                <Link to='/signin'>
                    <button>Sign In</button>
                </Link>
            </form>
        </div >
    );
};

export default SignUp;

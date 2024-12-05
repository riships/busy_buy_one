// components/SignUp.jsx
import React, { useState } from 'react';
import style from '../styles/authform.module.css';
import { Link } from 'react-router';

const SignUp = ({ isSignIn, setIsSignIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                <Link to='/login'>
                    <button>Sign In</button>
                </Link>
            </form>
        </div >
    );
};

export default SignUp;

// components/SignIn.jsx
import React, { useState } from 'react';
import style from '../styles/authform.module.css';

const SignIn = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signin Data:', formData);
        // Add API call for signin
    };

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
                <button>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignIn;

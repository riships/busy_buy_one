// components/SignUp.jsx
import React, { useState } from 'react';
import './AuthForm.css';

const SignUp = ({ isSignIn, setIsSignIn }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Signup Data:', formData);
        // Add API call for signup
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
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
                <button type="submit" style={{ marginBottom: 0 }}>Sign Up</button>
                <div className="divider">
                    <span>OR</span>
                </div>
                <button onClick={() => setIsSignIn(!isSignIn)}>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignUp;

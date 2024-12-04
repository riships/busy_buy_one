// components/SignUp.jsx
import React, { useState } from 'react';
import './AuthForm.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../fireBaseInit';

const SignUp = ({ isSignIn, setIsSignIn }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                console.log(user);
                setFormData({ email: '', password: '' });
                setError('')
            }).catch((err) => {
                console.log(err.code);

                if (err.code === 'auth/email-already-in-use') {
                    setError('User already Exist');
                } else if (err.code === 'auth/weak-password') {
                    setError('Password is not Strong.')
                } else {
                    setError('Internal Server Error')
                }
            })
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Sign Up</h2>
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
                {error && <p className='text-danger'>{error}</p>}
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

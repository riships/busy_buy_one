import React from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp';

function LoginSignup() {
    const [isSignIn, setIsSignIn] = useState(true);
    return (
        <>
            {isSignIn ? <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn} /> : <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn} />}
        </>
    )
}

export default LoginSignup
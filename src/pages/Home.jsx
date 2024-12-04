import React from 'react'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function Home() {
    return (
        <>
            <Navbar />
            {isSignIn ? <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn} /> : <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn} />}
        </>
    )
}

export default Home;
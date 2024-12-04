import React, { useState } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div>
      {isSignIn ? <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn} /> : <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn} />}
    </div>
  );
};

export default App;

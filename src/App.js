import React, { useState } from 'react';

import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';

const App = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    }
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default App;

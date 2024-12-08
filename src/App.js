import React, { useContext, useEffect } from 'react';
import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AuthContext from './context/Auth/AuthContext';
import MyOrders from './pages/MyOrders';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const auth = getAuth();
  const { setAuthUser } = useContext(AuthContext);

  // Authenticate the user if he is already logged in and set the user in the auth context.
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <Home />
        </>
      )
    },
    {
      path: '/myOrders',
      element: (
        <ProtectedRoute>
          <Header />
          <MyOrders />
        </ProtectedRoute>
      )
    },
    {
      path: '/cart',
      element: (
        <ProtectedRoute>
          <Header />
          <Cart />
        </ProtectedRoute>
      )
    },

    {
      path: '/signin',
      element: (
        <>
          <Header />
          <SignIn />
        </>
      )
    }, {
      path: '/signup',
      element: (
        <>
          <Header />
          <SignUp />
        </>
      )
    }
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default App;

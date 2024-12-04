import React from 'react';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      )
    }
  ])
  return (
    <RouterProvider router={router} />
  );
};

export default App;

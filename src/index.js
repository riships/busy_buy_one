import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthContextProvider from './context/Auth/AuthState';
import ProductState from './context/products/ProductState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ProductState>
      <App />
    </ProductState>
  </AuthContextProvider>
);

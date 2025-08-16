import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WrappedApp from './App';
import { CartProvider } from './CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <WrappedApp />
    </CartProvider>
  </React.StrictMode>
);
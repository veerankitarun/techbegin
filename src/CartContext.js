import { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

// Same CartProvider code here...
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => { /* your logic */ };
  const increaseQuantity = (id) => { /* ... */ };
  const decreaseQuantity = (id) => { /* ... */ };
  const removeFromCart = (id) => { /* ... */ };
  const clearCart = () => setCartItems([]);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart, increaseQuantity,
        decreaseQuantity, removeFromCart, clearCart, cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const exists = cartItems.find((med) => med.id === item.id);
    if (exists) {
      setCartItems(cartItems.map((med) =>
        med.id === item.id ? { ...med, quantity: med.quantity + 1 } : med
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const value = {
    cartItems,
    addToCart,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

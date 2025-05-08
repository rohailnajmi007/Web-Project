import React, { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

const currency = "$";
const delivery_fee = 10;
const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false);
const [cartItems, setCartItems] = useState(() => {
  const stored = localStorage.getItem('cartItems');
  return stored ? JSON.parse(stored) : {};
});

useEffect(() => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}, [cartItems]);

const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }
        else {
            cartData[itemId][size] = 1;
        }
    }
    else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
}
const getCartCount = () => {
    let totalCount = 0;
  
    for (const productId in cartItems) {
      const sizes = cartItems[productId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }
  
    return totalCount;
  };
  
const removeFromCart = (itemId, size) => {
  let cartData = structuredClone(cartItems);
  if (cartData[itemId] && cartData[itemId][size]) {
    delete cartData[itemId][size];
    // If no sizes left for this product, remove the product key
    if (Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
  }
};

const updateCartQuantity = (itemId, size, newQuantity) => {
  let cartData = structuredClone(cartItems);
  if (cartData[itemId] && cartData[itemId][size] !== undefined) {
    if (newQuantity > 0) {
      cartData[itemId][size] = newQuantity;
    } else {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
  }
};

  const value = {
    products, currency, delivery_fee, search, showSearch, setSearch, setShowSearch,
    addToCart, getCartCount, cartItems, removeFromCart, updateCartQuantity, setCartItems
}

    return (
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
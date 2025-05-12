import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : {};
  });
  const [wishlist, setWishlist] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });
  const [user, setUser] = useState(null); // For user authentication
  const [orders, setOrders] = useState([]); // For tracking user orders
  const [loading, setLoading] = useState(false); // For global loading state
  const [error, setError] = useState(null); // For global error handling

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Logout function to clear authentication and navigate to login
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          toast.success("Item added to cart");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error adding to cart", error);
        toast.error("Error adding to cart");
      }
    }
  };

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

  const addToWishlist = (itemId) => {
    if (!wishlist.includes(itemId)) {
      setWishlist([...wishlist, itemId]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((id) => id !== itemId));
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      console.error("Error fetching products data");
      toast.error("Error fetching products data");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    cartItems,
    removeFromCart,
    updateCartQuantity,
    setCartItems,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    user,
    setUser,
    orders,
    setOrders,
    loading,
    setLoading,
    error,
    setError,
    navigate,
    backendUrl,
    setToken,
    token,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import './cart.css';
import { GiWhiteBook } from 'react-icons/gi';
import CartTotals from '../Components/CartTotals';

const Cart = () => {
  const { products, cartItems, currency, removeFromCart, updateCartQuantity } = useContext(ShopContext);

  const getProduct = (id) => products.find(p => p._id === id);

  const cartList = [];
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      if (quantity > 0) {
        const product = getProduct(productId);
        if (product) {
          cartList.push({
            ...product,
            size,
            quantity,
            total: product.price * quantity
          });
        }
      }
    }
  }

  const totalPrice = cartList.reduce((sum, item) => sum + item.total, 0);

  if (cartList.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty.</h2>
        <Link to="/collection" className="cart-empty-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Product</th>
            <th>Size</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th></th> {/* Remove column */}
          </tr>
        </thead>
        <tbody>
          {cartList.map((item) => (
            <tr key={item._id + item.size}>
              <td className="cart-product-cell">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                />
                <span>{item.name}</span>
              </td>
              <td>{item.size}</td>
              <td>{currency}{item.price}</td>
              <td>
                <div className="cart-qty-selector">
                  <button
                    className="qty-btn"
                    onClick={() => updateCartQuantity(item._id, item.size, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateCartQuantity(item._id, item.size, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>{currency}{item.total}</td>
              <td>
  <button
    onClick={() => removeFromCart(item._id, item.size)}
    style={{
      background: "#ffffff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      padding: "0.3rem 0.8rem",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem"
    }}
    title="Delete"
  >
    🗑️
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CartTotals />
    </div>
  );
};

export default Cart;
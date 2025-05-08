import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CartTotals.css';
import { useNavigate } from 'react-router-dom';

const CartTotals = ({ buttonText = 'Proceed to Checkout' }) => {
  const { products, cartItems, currency, delivery_fee, setCartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  // Helper to get product by id
  const getProduct = (id) => products.find(p => p._id === id);

  // Calculate subtotal
  let subtotal = 0;
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];
      const product = getProduct(productId);
      if (product && quantity > 0) {
        subtotal += product.price * quantity;
      }
    }
  }

  const total = subtotal + delivery_fee;

  const handleClick = () => {
    if (buttonText === 'Place Order') {
      // Save the current cart as a single order (grouped)
      const items = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          const product = getProduct(productId);
          if (product && quantity > 0) {
            items.push({
              name: product.name,
              image: product.image,
              price: product.price,
              quantity,
              size
            });
          }
        }
      }
      if (items.length > 0) {
        const order = {
          items,
          date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
        };
        const prevOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([...prevOrders, order]));
        setCartItems({}); // Clear cart
      }
      navigate('/orders');
    } else {
      navigate('/placeorder');
    }
  };

  return (
    <div className="cart-totals-box">
      <h3 className="cart-totals-title">CART TOTALS <span className="cart-totals-divider" /></h3>
      <div className="cart-totals-row">
        <span>Subtotal</span>
        <span>{currency}{subtotal.toFixed(2)}</span>
      </div>
      <div className="cart-totals-row">
        <span>Shipping Fee</span>
        <span>{currency}{delivery_fee}</span>
      </div>
      <div className="cart-totals-row cart-totals-total">
        <span>Total</span>
        <span>{currency}{total.toFixed(2)}</span>
      </div>
      <button className="checkout-btn" onClick={handleClick}>{buttonText}</button>
    </div>
  );
};

export default CartTotals; 
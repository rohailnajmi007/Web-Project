import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching orders from localStorage
    const stored = localStorage.getItem('orders');
    if (stored) {
      let parsed = JSON.parse(stored);
      // Defensive: filter only valid orders (with items array and date)
      parsed = Array.isArray(parsed)
        ? parsed.filter(order => order && Array.isArray(order.items) && order.date)
        : [];
      setOrders(parsed);
    }
  }, []);

  const removeOrder = (idx) => {
    const updated = orders.filter((_, i) => i !== idx);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="orders-container">
      <h2 className="orders-title">MY <span className="orders-title-bold">ORDERS</span> <span className="orders-divider" /></h2>
      {orders.length === 0 ? (
        <div className="orders-empty">No orders placed yet.</div>
      ) : (
        <div className="orders-list">
          {orders.map((order, idx) => (
            <div className="order-group" key={idx}>
              <button className="order-remove-btn" onClick={() => removeOrder(idx)} title="Remove Order">&times;</button>
              <div className="order-group-date">Date: {order.date}</div>
              {order.items.map((item, iidx) => (
                <div className="order-item" key={iidx}>
                  <img className="order-img" src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} />
                  <div className="order-info">
                    <div className="order-name">{item.name}</div>
                    <div className="order-details">
                      <span className="order-price">${item.price}</span>
                      <span className="order-qty">Quantity: {item.quantity}</span>
                      <span className="order-size">Size: {item.size}</span>
                    </div>
                  </div>
                  <div className="order-status">
                    <span className="order-status-dot" /> Ready to ship
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
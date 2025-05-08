import React, { useState } from 'react';
import CartTotals from '../Components/CartTotals';
import './PlaceOrder.css';
import { assets } from '../assets/assets';

const paymentMethods = [
  { key: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
  { key: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
  { key: 'cod', label: 'Cash on Delivery', logo: null },
];

const PlaceOrder = () => {
    const [selectedMethod, setSelectedMethod] = useState('stripe');
    return (
        <div className="placeorder-container">
            <div className="placeorder-left">
                <h2 className="placeorder-title">DELIVERY <span className="placeorder-title-bold">INFORMATION</span> <span className="placeorder-divider" /></h2>
                <form className="placeorder-form">
                    <div className="placeorder-form-row">
                        <input type="text" placeholder="First name" name="firstName" required />
                        <input type="text" placeholder="Last name" name="lastName" required />
                    </div>
                    <input type="email" placeholder="Email address" name="email" required />
                    <input type="text" placeholder="Street" name="street" required />
                    <div className="placeorder-form-row">
                        <input type="text" placeholder="City" name="city" required />
                        <input type="text" placeholder="State" name="state" required />
                    </div>
                    <div className="placeorder-form-row">
                        <input type="text" placeholder="Zipcode" name="zipcode" required />
                        <input type="text" placeholder="Country" name="country" required />
                    </div>
                    <input type="tel" placeholder="Phone" name="phone" required />
                </form>
                <div className="payment-method-box">
                  <h3 className="payment-method-title">PAYMENT <span className="payment-method-title-bold">METHOD</span> <span className="payment-method-divider" /></h3>
                  <div className="payment-method-options">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.key}
                        className={`payment-method-option${selectedMethod === method.key ? ' selected' : ''}${method.key === 'cod' ? ' cod' : ''}`}
                        onClick={() => setSelectedMethod(method.key)}
                      >
                        <span className={`payment-radio${selectedMethod === method.key ? ' checked' : ''}`}></span>
                        {method.logo ? (
                          <img src={method.logo} alt={method.label} className="payment-method-logo" />
                        ) : (
                          <span className="payment-method-cod-label">CASH ON DELIVERY</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            <div className="placeorder-right">
                <CartTotals buttonText="Place Order" />
            </div>
        </div>
    );
};

export default PlaceOrder;  
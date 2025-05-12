import React from 'react';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className='footer-content'>
        <div className='footer-main'>
          <img src={logo} className='footer-logo' alt='Logo' />
          <p className='footer-desc'>
          Creating high-quality, timeless apparel designed for comfort and effortless style. Focusing on the essentials — premium materials, durable designs, and a perfect fit for your everyday life.
          </p>
        </div>
        <div className='footer-col'>
          <h3 className='footer-heading'>COMPANY</h3>
          <ul className='footer-links'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div className='footer-col'>
          <h3 className='footer-heading'>GET IN TOUCH</h3>
          <ul className='footer-contact'>
            <li>+1-212-456-7890</li>
            <li>contact@gearup.com</li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>Copyright {new Date().getFullYear()}@gearup.com - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>Copyright {new Date().getFullYear()}@ forever.com - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

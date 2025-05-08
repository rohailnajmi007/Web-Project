import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';
import hero_img from '../assets/hero_img.png';

const Hero = () => {
  const scrollToBestSeller = () => {
    const bestSellerSection = document.getElementById('bestseller-section');
    if (bestSellerSection) {
      bestSellerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-content">
        <div className="hero-image">
          <img src={hero_img} alt="Model" />
        </div>
        <div className="hero-box">
          <div className="bestseller-tag" onClick={scrollToBestSeller} style={{ cursor: 'pointer' }}>
            <span className="line"></span>
            <span>OUR BESTSELLERS</span>
          </div>
          <h1>Latest Arrivals</h1>
          <div className="shop-now">
            <span>SHOP NOW</span>
            <span className="line"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
